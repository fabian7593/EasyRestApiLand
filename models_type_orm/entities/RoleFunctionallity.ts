import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Roles } from "./Roles";
import { Screens } from "./Screens";

@Index("role_code", ["roleCode"], {})
@Index("screen_code", ["screenCode"], {})
@Entity("role_functionallity", { schema: "easy_api_land_db" })
export class RoleFunctionallity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "role_code", length: 35 })
  roleCode: string;

  @Column("enum", {
    name: "func_type",
    nullable: true,
    enum: ["C", "R", "U", "D"],
  })
  funcType: "C" | "R" | "U" | "D" | null;

  @Column("varchar", { name: "function_code", length: 50 })
  functionCode: string;

  @Column("varchar", { name: "screen_code", nullable: true, length: 50 })
  screenCode: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 400 })
  description: string | null;

  @ManyToOne(() => Roles, (roles) => roles.roleFunctionallities, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "role_code", referencedColumnName: "code" }])
  roleCode2: Roles;

  @ManyToOne(() => Screens, (screens) => screens.roleFunctionallities, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "screen_code", referencedColumnName: "code" }])
  screenCode2: Screens;
}
