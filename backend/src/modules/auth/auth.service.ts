import { Injectable, ConflictException, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    try {
      const adminEmail = 'admin@yoimpulso.bo';
      const entrepreneurEmail = 'entrepreneur@yoimpulso.bo';

      // Check if admin already exists
      const adminExist = await this.userRepository.findOne({ where: { email: adminEmail } });
      if (!adminExist) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('admin123', salt);
        const adminUser = this.userRepository.create({
          email: adminEmail,
          passwordHash,
          role: 'ADMIN',
        });
        await this.userRepository.save(adminUser);
        console.log('🌱 Seeded default ADMIN user: admin@yoimpulso.bo / admin123');
      }

      // Check if entrepreneur already exists
      const entrepreneurExist = await this.userRepository.findOne({ where: { email: entrepreneurEmail } });
      if (!entrepreneurExist) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('entrepreneur123', salt);
        const entrepreneurUser = this.userRepository.create({
          email: entrepreneurEmail,
          passwordHash,
          role: 'ENTREPRENEUR',
        });
        await this.userRepository.save(entrepreneurUser);
        console.log('🌱 Seeded default ENTREPRENEUR user: entrepreneur@yoimpulso.bo / entrepreneur123');
      }
    } catch (error) {
      console.warn('⚠️ Seeding failed or table users does not exist yet:', error.message);
    }
  }

  async register(registerDto: RegisterDto) {
    const { email, password, role } = registerDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = this.userRepository.create({
      email,
      passwordHash,
      role,
    });

    const savedUser = await this.userRepository.save(newUser);
    
    return {
      id: savedUser.id,
      email: savedUser.email,
      role: savedUser.role,
      isPremium: savedUser.isPremium,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { id: user.id, role: user.role };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isPremium: user.isPremium,
      },
    };
  }
}
