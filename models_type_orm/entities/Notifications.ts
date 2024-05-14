import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserNotifications } from "./UserNotifications";

@Index("code", ["code"], { unique: true })
@Index("idx_code", ["code"], {})
@Entity("notifications", { schema: "easy_api_land_db" })
export class Notifications {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "code", unique: true, length: 60 })
  code: string;

  @Column("varchar", {
    name: "type",
    nullable: true,
    length: 30,
    default: () => "'GENERAL'",
  })
  type: string | null;

  @Column("varchar", { name: "subject", length: 100 })
  subject: string;

  @Column("varchar", { name: "message", length: 250 })
  message: string;

  @Column("tinyint", {
    name: "required_send_email",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  requiredSendEmail: boolean | null;

  @Column("tinyint", {
    name: "is_delete_after_read",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  isDeleteAfterRead: boolean | null;

  @Column("varchar", { name: "action_url", nullable: true, length: 400 })
  actionUrl: string | null;

  @Column("datetime", {
    name: "created_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date | null;

  @OneToMany(
    () => UserNotifications,
    (userNotifications) => userNotifications.notificationCode2
  )
  userNotifications: UserNotifications[];
}
