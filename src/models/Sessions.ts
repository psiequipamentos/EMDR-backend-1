import { Column, Entity, ManyToOne } from "typeorm";
import MasterModel from "./MasterModel";
import Paciente from "./Paciente";
import Psicologo from "./Psicologo";

@Entity()
export default class Sessions extends MasterModel {
  @Column({ nullable: false, unique: true })
  session_id: string;

  @ManyToOne(() => Psicologo, (psicologo) => psicologo.id)
  psicologo: Psicologo;

  @ManyToOne(() => Paciente, (paciente) => paciente.id)
  paciente: Paciente;

  @Column()
  paciente_socket_id: string;

  @Column()
  psicologo_socket_id: string;

  @Column({ nullable: false, unique: true })
  session_link: string;
}
