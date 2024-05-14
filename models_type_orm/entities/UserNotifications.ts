import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Notifications } from "./Notifications";
import { Users } from "./Users";

@Index("notification_code", ["notificationCode"], {})
@Index("id_user_send", ["idUserSend"], {})
@Index("id_user_receive", ["idUserReceive"], {})
@Entity("user_notifications", { schema: "easy_api_land_db" })
export class UserNotifications {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_user_send", nullable: true, unsigned: true })
  idUserSend: number | null;

  @Column("int", { name: "id_user_receive", unsigned: true })
  idUserReceive: number;

  @Column("varchar", { name: "notification_code", length: 60 })
  notificationCode: string;

  @Column("tinyint", {
    name: "is_read",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isRead: boolean | null;

  @Column("tinyint", {
    name: "is_deleted",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isDeleted: boolean | null;

  @Column("datetime", {
    name: "created_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date | null;

  @ManyToOne(
    () => Notifications,
    (notifications) => notifications.userNotifications,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "notification_code", referencedColumnName: "code" }])
  notificationCode2: Notifications;

  @ManyToOne(() => Users, (users) => users.userNotifications, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_user_send", referencedColumnName: "id" }])
  idUserSend2: Users;

  @ManyToOne(() => Users, (users) => users.userNotifications2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_user_receive", referencedColumnName: "id" }])
  idUserReceive2: Users;
}
