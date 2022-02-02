import { Column, Entity, OneToMany, ManyToOne } from "typeorm";
import MasterModel from "./MasterModel";
import Sessions from "./Sessions";
import Psicologo from "./Psicologo";

@Entity()
export default class Paciente extends MasterModel {

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  nome: string;

  @OneToMany(()=> Sessions, (session) => session.paciente,{eager: true, onDelete: 'CASCADE'})
  pacient_sessions: Sessions[]

  @Column({ nullable: true })
  pais: string;

  @ManyToOne(() => Psicologo, (psicologo) => psicologo.id, {nullable: false})
  psicologo: Psicologo

  @Column({ nullable: false })
  telefone: string;
}
