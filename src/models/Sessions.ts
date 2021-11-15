import { Column, Entity } from "typeorm";
import MasterModel from "./MasterModel";

@Entity()
export default class Sessions extends MasterModel {
  @Column({ nullable: false, unique: true })
  session_id: string;

  @Column({ nullable: false })
  psychologist: number; // TODO FK

  @Column({ nullable: false })
  patient: number; // TODO FK

  @Column()
  patient_socket_id: string;

  @Column()
  psychologist_socket_id: string;

  @Column({ nullable: false, unique: true })
  session_link: string;
}
