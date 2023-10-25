import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/pages/Home/types";
import { api } from "@/services/api";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import { validateCEP } from "@/utils/validateCep";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { isMinimumAge } from "@/utils/calculateAge";

export function CreateUserDialog() {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    cep: "",
    city: "",
    complement: "",
    name: "",
    neighborhood: "",
    number: 0,
    referencePoint: "",
    state: "",
    street: "",
  });
  const [user, setUser] = useState<User>({
    addresses: [],
    birthDate: new Date(),
    contactDetails: {
      landline: "",
      mobile: "",
    },
    cpf: "",
    email: "",
    gender: "Outros",
    name: "",
    password: "",
  });

  async function handleCreateUser(event: React.FormEvent) {
    event.preventDefault();
    if (address.state != "AM" && isMinimumAge(user.birthDate) == false) {
      alert(
        "A idade mínima para se cadastrar é 18 anos e o CEP precisa ser do estado do Amazonas"
      );
    } else {
      await api
        .post("/users/create", user)
        .then((response) => {
          navigate("/");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async function getAddressByViaCepAPI() {
    await axios
      .get(`https://viacep.com.br/ws/${address.cep}/json/`)
      .then((response) => {
        setAddress({
          ...address,
          cep: response.data.cep,
          street: response.data.logradouro,
          complement: response.data.complemento,
          city: response.data.localidade,
          state: response.data.uf,
          neighborhood: response.data.bairro,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const isCepValid = validateCEP(String(address.cep));
    if (isCepValid == true) {
      getAddressByViaCepAPI();
    }
  }, [address.cep]);
  console.log(user);
  return (
    <form onSubmit={handleCreateUser} className="w-[400px] mx-auto my-56">
      <Button variant="link" className="p-0" onClick={() => navigate("/")}>
        <ChevronLeft className="h-4 w-4" />
        Voltar
      </Button>
      <h1 className="text-2xl font-bold">Formulário de cadastro de usuário</h1>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="name" className="text-left block">
            Nome
          </Label>
          <div className="col-span-3">
            <Input
              id="name"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUser({ ...user, name: event.target.value })
              }
            />
          </div>
        </div>

        <Label htmlFor="username" className="text-left">
          Gênero
        </Label>
        <div className="grid grid-cols-1 items-center gap-4">
          <div className="grid w-full items-center gap-4">
            <Select
              onValueChange={(value) =>
                setUser({
                  ...user,
                  gender:
                    value == "Masculino" ||
                    value == "Feminino" ||
                    value == "Outros"
                      ? value
                      : "Outros",
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Gênero" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Masculino">Masculino</SelectItem>
                <SelectItem value="Feminino">Feminino</SelectItem>
                <SelectItem value="Outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Label htmlFor="cpf" className="text-left">
          CPF
        </Label>
        <div className="grid grid-cols- items-center gap-4">
          <Input
            id="cpf"
            className="col-span-3"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, cpf: event.target.value })
            }
          />
        </div>
        <Label htmlFor="cep" className="text-left">
          CEP
        </Label>
        <div className="grid grid-cols- items-center gap-4">
          <Input
            id="cep"
            className="col-span-3"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAddress({ ...address, cep: event.target.value });
            }}
          />
        </div>
        <Label htmlFor="street" className="text-left">
          Logradouro
        </Label>
        <div className="grid grid-cols- items-center gap-4">
          <Input
            id="street"
            className="col-span-3"
            value={address.street}
            disabled
          />
        </div>
        <Label htmlFor="neighborhood" className="text-left">
          Bairro
        </Label>
        <div className="grid grid-cols- items-center gap-4">
          <Input
            id="neighborhood"
            className="col-span-3"
            value={address.neighborhood}
            disabled
          />
        </div>
        <Label htmlFor="city" className="text-left">
          Cidade
        </Label>
        <div className="grid grid-cols- items-center gap-4">
          <Input
            id="city"
            className="col-span-3"
            value={address.city}
            disabled
          />
        </div>
        <Label htmlFor="state" className="text-left">
          Estado
        </Label>
        <div className="grid grid-cols- items-center gap-4">
          <Input
            id="state"
            className="col-span-3"
            value={address.state}
            disabled
          />
        </div>
        <Label htmlFor="number" className="text-left">
          Número
        </Label>
        <div className="grid grid-cols- items-center gap-4">
          <Input
            id="number"
            className="col-span-3"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAddress({
                ...address,
                number: Number(event.target.value),
              })
            }
          />
        </div>
        <Label htmlFor="complement" className="text-left">
          Complemento
        </Label>
        <div className="grid grid-cols- items-center gap-4">
          <Input
            id="complement"
            className="col-span-3"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAddress({
                ...address,

                complement: event.target.value,
              })
            }
          />
        </div>
        <Label htmlFor="referencePoint" className="text-left">
          Ponto de referência
        </Label>
        <div className="grid grid-cols- items-center gap-4">
          <Input
            id="referencePoint"
            className="col-span-3"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAddress({
                ...address,

                referencePoint: event.target.value,
              })
            }
          />
        </div>
        <Label htmlFor="mobile" className="text-left">
          Telefone Móvel
        </Label>
        <div className="grid grid-cols- items-center gap-4">
          <Input
            id="mobile"
            className="col-span-3"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUser({
                ...user,
                contactDetails: {
                  ...user.contactDetails,
                  mobile: event.target.value,
                },
              })
            }
          />
        </div>
        <Label htmlFor="landline" className="text-left">
          Telefone Fixo
        </Label>
        <div className="grid grid-cols- items-center gap-4">
          <Input
            id="landline"
            className="col-span-3"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUser({
                ...user,
                contactDetails: {
                  ...user.contactDetails,
                  landline: event.target.value,
                },
              })
            }
          />
        </div>
        <Label htmlFor="number" className="text-left">
          Data de Nascimento
        </Label>
        <div className="grid grid-cols- items-center gap-4">
          <Input
            id="number"
            className="col-span-3"
            //   value={user.addresses[0].street}
            type="date"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUser({
                ...user,
                birthDate: new Date(event.target.value),
              })
            }
          />
        </div>
        <Label htmlFor="email" className="text-left">
          E-mail
        </Label>
        <div className="grid grid-cols- items-center gap-4">
          <Input
            id="email"
            type="email"
            className="col-span-3"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUser({
                ...user,
                email: event.target.value,
              })
            }
          />
        </div>
        <Label htmlFor="landline" className="text-left">
          Senha
        </Label>
        <div className="grid grid-cols- items-center gap-4">
          <Input
            id="landline"
            className="col-span-3"
            type="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUser({
                ...user,
                password: event.target.value,
              })
            }
          />
        </div>
      </div>
      <Button onClick={handleCreateUser} variant="outline">
        Confirmar
      </Button>
    </form>
  );
}
