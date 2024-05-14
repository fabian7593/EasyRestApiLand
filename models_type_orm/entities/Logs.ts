import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("logs", { schema: "easy_api_land_db" })
export class Logs {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "method", length: 200 })
  method: string;

  @Column("varchar", { name: "class", length: 200 })
  class: string;

  @Column("varchar", { name: "type", nullable: true, length: 40 })
  type: string | null;

  @Column("int", { name: "https", nullable: true })
  https: number | null;

  @Column("varchar", { name: "message", length: 800 })
  message: string;

  @Column("varchar", { name: "description", nullable: true, length: 400 })
  description: string | null;

  @Column("datetime", {
    name: "created_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date | null;

  @Column("varchar", { name: "user_id", nullable: true, length: 200 })
  userId: string | null;

  @Column("varchar", { name: "app_guid", nullable: true, length: 200 })
  appGuid: string | null;

  @Column("varchar", { name: "environment", nullable: true, length: 200 })
  environment: string | null;
}
