import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("name", ["name"], { unique: true })
@Index("user_id", ["userId"], {})
@Entity("documents", { schema: "easy_api_land_db" })
export class Documents {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 100 })
  name: string;

  @Column("varchar", { name: "file_name", length: 250 })
  fileName: string;

  @Column("varchar", { name: "extension", length: 10 })
  extension: string;

  @Column("varchar", { name: "action_type", length: 100 })
  actionType: string;

  @Column("enum", {
    name: "type",
    nullable: true,
    enum: ["DOC", "IMG", "OTHER"],
    default: () => "'IMG'",
  })
  type: "DOC" | "IMG" | "OTHER" | null;

  @Column("varchar", { name: "description", nullable: true, length: 400 })
  description: string | null;

  @Column("varchar", { name: "url", nullable: true, length: 500 })
  url: string | null;

  @Column("int", { name: "id_for_table", unsigned: true })
  idForTable: number;

  @Column("varchar", {
    name: "table",
    nullable: true,
    length: 100,
    default: () => "'GENERAL'",
  })
  table: string | null;

  @Column("tinyint", {
    name: "is_deleted",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isDeleted: boolean | null;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("datetime", {
    name: "created_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date | null;

  @ManyToOne(() => Users, (users) => users.documents, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
