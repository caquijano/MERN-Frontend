import React, { useEffect, useState, ChangeEvent } from "react";
import * as userService from "../Auth/userService";
import {User} from "../Auth/User" 
import { toast } from "react-toastify";
import { FiEdit} from "react-icons/fi";
import { BsEyeFill,  BsTrash } from "react-icons/bs";
import * as rolService from "../Role/rolService";

function UserList() {
    const token = localStorage.getItem('loggedGreenUser')
  const [users, setUsers] = useState<User[]>([]);
  const [load, setLoad] = useState(true);
  const [rol, setRol] = useState<any>([])
  const [search, setSearch] = useState("");
  
  const loadRol = async () => {
    const res:any = await rolService.getRoles();
    setRol(res.data)
  };
  const loadUsers = async () => {
    const res = await userService.getUsers();
    setUsers(res.data);
  };
  const handleDelete = async (id: string) => {
    if (window.confirm("¿Realmente desea eliminar este articulo?")) {
      await userService.deleteUser(id, `${token}`);
      toast.error("Usuario Eliminado con exito");
      setLoad(!load);
    }
  };
  const handlerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setLoad(!load);
  };
  
  useEffect(() => {
    loadRol();
    loadUsers();
  }, [load]);

  return (
    <div>
      <div
        className=" row p-5"
        style={{
          alignItems: "center",
          alignContent: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <div className="form-group col-lg-1"></div>
        <div className="form-group col-lg-2">
          <label className="col-form-label" htmlFor="inputDefault">
            Buscar producto:{" "}
          </label>
        </div>
        <div className="form-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Ingresar nombre de producto"
            id="inputDefault"
            onChange={handlerInputChange}
          />
        </div>
        <div className="form-group col-lg-2"></div>
        <br />
        <br />
        <div className="card border-primary mb-3" style={{ width: 1000 }}>
          <div className="card-header">Inventario</div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Email</th>
                  <th scope="col">Dirección</th>
                  <th scope="col">Rol</th>
                  <th scope="col">... Opciones... </th>
                </tr>
              </thead>
              {users.map((user, index) => {
                if (!user.name.indexOf(search)) {
                  return (
                    <tbody key={index}>
                      <tr>
                        
                        <td>{user.name+" "+user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.address+" "+user.city}</td>
                       
                        <td>{(user.roles === rol[2])? user.roles : "user"}</td>
                        <td>
                        <button
                           
                            style={{ marginRight: 5 }}
                            className="btn btn-info btn-sm"
                            onClick={() => window.location.href=`/userview/${user._id}`
                            }
                          >
                            {" "}
                            <BsEyeFill />
                          </button>
                          <button
                            className="btn btn-warning btn-sm"
                            style={{ marginRight: 5 }}
                           
                          >
                            {" "}
                            <FiEdit style={{ color: "#fff" }} />
                          </button>
                          <button
                            onClick={() =>
                              user._id && handleDelete(user._id)
                            }
                            style={{ marginRight: 5 }}
                            className="btn btn-danger btn-sm"
                          >
                            {" "}
                            <BsTrash />
                          </button>
                          
                        </td>
                      </tr>
                    </tbody>
                  );
                }
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
