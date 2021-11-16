import { Column, Entity, OneToMany } from "typeorm";
import MasterModel from "./MasterModel";
import Sessions from "./Sessions";

@Entity()
export default class Psicologo extends MasterModel {

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  nome: string;

  @OneToMany(()=> Sessions, (session) => session.id)
  psicologo_sessions: Sessions[]

  @Column({ nullable: false })
  telefone: string;

  @Column({ nullable: false })
  senha: string;


}
