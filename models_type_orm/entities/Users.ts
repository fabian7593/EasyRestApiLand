import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Documents } from "./Documents";
import { UnitsDynamicCentral } from "./UnitsDynamicCentral";
import { Roles } from "./Roles";
import { UserNotifications } from "./UserNotifications";

@Index("email", ["email"], { unique: true })
@Index("role_code", ["roleCode"], {})
@Entity("users", { schema: "easy_api_land_db" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "card_id", nullable: true, unsigned: true })
  cardId: number | null;

  @Column("varchar", { name: "first_name", length: 250 })
  firstName: string;

  @Column("varchar", { name: "last_name", length: 250 })
  lastName: string;

  @Column("varchar", { name: "email", unique: true, length: 250 })
  email: string;

  @Column("varchar", { name: "phone_number", nullable: true, length: 250 })
  phoneNumber: string | null;

  @Column("varchar", { name: "password", length: 250 })
  password: string;

  @Column("enum", { name: "gender", nullable: true, enum: ["M", "F", "O"] })
  gender: "M" | "F" | "O" | null;

  @Column("datetime", { name: "birth_date", nullable: true })
  birthDate: Date | null;

  @Column("varchar", { name: "country_iso_code", nullable: true, length: 3 })
  countryIsoCode: string | null;

  @Column("varchar", { name: "role_code", length: 35 })
  roleCode: string;

  @Column("tinyint", {
    name: "is_deleted",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isDeleted: boolean | null;

  @Column("tinyint", {
    name: "is_active",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isActive: boolean | null;

  @Column("int", {
    name: "fail_login_number",
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  failLoginNumber: number | null;

  @Column("varchar", {
    name: "forgot_password_token",
    nullable: true,
    length: 400,
  })
  forgotPasswordToken: string | null;

  @Column("varchar", {
    name: "active_register_token",
    nullable: true,
    length: 400,
  })
  activeRegisterToken: string | null;

  @Column("decimal", {
    name: "latitude",
    nullable: true,
    precision: 11,
    scale: 8,
  })
  latitude: string | null;

  @Column("decimal", {
    name: "longitude",
    nullable: true,
    precision: 11,
    scale: 8,
  })
  longitude: string | null;

  @OneToMany(() => Documents, (documents) => documents.user)
  documents: Documents[];

  @OneToMany(
    () => UnitsDynamicCentral,
    (unitsDynamicCentral) => unitsDynamicCentral.user
  )
  unitsDynamicCentrals: UnitsDynamicCentral[];

  @OneToMany(
    () => UnitsDynamicCentral,
    (unitsDynamicCentral) => unitsDynamicCentral.userUpdated
  )
  unitsDynamicCentrals2: UnitsDynamicCentral[];

  @ManyToOne(() => Roles, (roles) => roles.users, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "role_code", referencedColumnName: "code" }])
  roleCode2: Roles;

  @OneToMany(
    () => UserNotifications,
    (userNotifications) => userNotifications.idUserSend2
  )
  userNotifications: UserNotifications[];

  @OneToMany(
    () => UserNotifications,
    (userNotifications) => userNotifications.idUserReceive2
  )
  userNotifications2: UserNotifications[];
}
