import { Column, Entity, OneToMany } from "typeorm";
import MasterModel from "./MasterModel";
import Sessions from "./Sessions";

@Entity()
export default class Paciente extends MasterModel {

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  nome: string;

  @OneToMany(()=> Sessions, (session) => session.id)
  pacient_sessions: Sessions[]
  
  @Column({ nullable: false })
  pais: string;

  @Column({ nullable: false })
  telefone: string;
}
