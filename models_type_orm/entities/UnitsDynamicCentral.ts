import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("code", ["code"], { unique: true })
@Index("user_id", ["userId"], {})
@Index("user_updated_id", ["userUpdatedId"], {})
@Entity("units_dynamic_central", { schema: "easy_api_land_db" })
export class UnitsDynamicCentral {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "code", unique: true, length: 100 })
  code: string;

  @Column("varchar", { name: "name", length: 100 })
  name: string;

  @Column("enum", {
    name: "type",
    nullable: true,
    enum: ["PROJECT_TYPE", "PROJECT_CATEGORY", "INDUSTRY_TYPE"],
  })
  type: "PROJECT_TYPE" | "PROJECT_CATEGORY" | "INDUSTRY_TYPE" | null;

  @Column("varchar", { name: "description", nullable: true, length: 400 })
  description: string | null;

  @Column("varchar", { name: "value1", length: 300 })
  value1: string;

  @Column("varchar", { name: "value2", nullable: true, length: 300 })
  value2: string | null;

  @Column("varchar", { name: "value3", nullable: true, length: 300 })
  value3: string | null;

  @Column("varchar", { name: "value4", nullable: true, length: 300 })
  value4: string | null;

  @Column("varchar", { name: "value5", nullable: true, length: 300 })
  value5: string | null;

  @Column("varchar", { name: "country_iso_code", nullable: true, length: 3 })
  countryIsoCode: string | null;

  @Column("datetime", {
    name: "created_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date | null;

  @Column("datetime", { name: "updated_date", nullable: true })
  updatedDate: Date | null;

  @Column("tinyint", {
    name: "is_deleted",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isDeleted: boolean | null;

  @Column("int", { name: "user_id", nullable: true, unsigned: true })
  userId: number | null;

  @Column("int", { name: "user_updated_id", nullable: true, unsigned: true })
  userUpdatedId: number | null;

  @ManyToOne(() => Users, (users) => users.unitsDynamicCentrals, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Users, (users) => users.unitsDynamicCentrals2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_updated_id", referencedColumnName: "id" }])
  userUpdated: Users;
}
