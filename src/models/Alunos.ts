import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@Entity()
export default class Alunos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome_completo: string;

  @Column()
  foto: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  telefone: string;

  @Column({ nullable: false, unique: true })
  cpf: string;

  @Column()
  endereco: string;

  @Column()
  curso: string;

  @Column()
  faculdade: string;

  @Column()
  mais_infromacoes_academicas: string;

  @Column()
  senha: string;

  @Column()
  status: boolean;

  @Column()
  last_login: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;
}
