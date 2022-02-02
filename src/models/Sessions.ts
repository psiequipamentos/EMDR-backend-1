import { Column, Entity, ManyToOne } from "typeorm";
import MasterModel from "./MasterModel";
import Paciente from "./Paciente";
import Psicologo from "./Psicologo";

@Entity()
export default class Sessions extends MasterModel {
  @Column({ nullable: false, unique: true })
  session_id: string;

  @ManyToOne(() => Psicologo, (psicologo) => psicologo.psicologo_sessions, {onDelete: 'CASCADE'})
  psicologo: Psicologo;

  @ManyToOne(() => Paciente, (paciente) => paciente.pacient_sessions, {onDelete: 'CASCADE'})
  paciente: Paciente;

  @Column({nullable: true})
  paciente_socket_id: string;

  @Column({nullable:true})
  psicologo_socket_id: string;

  @Column({ nullable: false, unique: true })
  session_code: string;

  @Column({unique:true})
  daily_co_name: string;

}
