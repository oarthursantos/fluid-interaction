import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/pages/Home/types";
import { useState } from "react";
import { UpdateUser } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDateToYYYYMMDD } from "@/utils/formatDate";

interface UpdateUserDialogProps {
  children: React.ReactNode;
  user: User;
  onEditUser: (id: string, currentUser: UpdateUser) => void;
}

export function UpdateUserDialog({
  children,
  user,
  onEditUser,
}: UpdateUserDialogProps) {
  const [currentUser, setCurrentUser] = useState<UpdateUser>({
    birthDate: new Date(),
    gender: "Outros",
    name: "",
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
          <DialogDescription>
            Altere os campos que deseja atualizar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              // defaultValue="Pedro Duarte"
              className="col-span-3"
              defaultValue={user.name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setCurrentUser({ ...currentUser, name: event.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Gênero
            </Label>
            <Select>
              <SelectTrigger className="col-span-1">
                <SelectValue placeholder={`${user.gender}`} />
              </SelectTrigger>
              <SelectContent defaultValue={user.gender}>
                <SelectItem value="Masculino">Masculino</SelectItem>
                <SelectItem value="Feminino">Feminino</SelectItem>
                <SelectItem value="Outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Data de nascimento
            </Label>
            <Input
              // value={formatDate(user.birthDate)}
              id="name"
              type="date"
              value={formatDateToYYYYMMDD(user.birthDate)}
              // defaultValue={}
              className="col-span-3"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setCurrentUser({ ...currentUser, name: event.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onEditUser(String(user.id), currentUser)}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
