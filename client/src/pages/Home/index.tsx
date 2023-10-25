import {
  Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { User } from "./types";
import { formatDate } from "@/utils/formatDate";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpdateUserDialog } from "@/components/UpdateUserDialog";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteUserDialog";

import { useNavigate } from "react-router-dom";
import { UpdateUser } from "@/components/UpdateUserDialog/types";

export function Home() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  async function handleGetUsers() {
    await api
      .get("/users")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .then((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    handleGetUsers();
  }, []);

  async function handleDeleteUser(id: string) {
    await api
      .delete(`/users/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        handleGetUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function handleEditUser(id: string, currentUser: UpdateUser) {
    await api
      .put(`/users/update/${id}`, currentUser)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <Table className="items-center">
        <TableCaption>Lista de todos os usuários</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Data de Nascimento</TableHead>
            <TableHead>Gênero</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{formatDate(user.birthDate)}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.cpf}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="flex gap-2">
                <UpdateUserDialog
                  user={user}
                  onEditUser={handleEditUser}
                >
                  <Button
                    variant="default"
                    size="icon"
                    className="bg-blue-500 rounded hover:bg-blue-700"
                  >
                    <Pencil className="h-4 w-4" color="white" />
                  </Button>
                </UpdateUserDialog>
                <ConfirmDeleteDialog
                  user={user}
                  onDeleteUser={() => handleDeleteUser(String(user.id))}
                >
                  <Button
                    variant="destructive"
                    size="icon"
                    className="bg-red-500 rounded hover:bg-red-700"
                  >
                    <Trash className="h-4 w-4" color="white" />
                  </Button>
                </ConfirmDeleteDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <Button
            variant="outline"
            className="m-4"
            onClick={() => navigate("/register-user")}
          >
            Registrar novo usuário
          </Button>
        </TableFooter>
      </Table>
    </>
  );
}
