import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../Auth/User";
import * as userService from "../Auth/userService";
import * as rolService from "../Role/rolService";
function UserView() {
  interface Params {
    id?: any;
  }
  const params = useParams<Params>();
  const [user, setUser] = useState<User>();
  const [rol, setRol] = useState("")
  const loadUser = async () => {
    const res = await userService.getUser(params.id);
    setUser(res.data);
    loadRol(res.data.roles);
  };
  const loadRol = async (id:any) => {
    const res:any = await rolService.getRole(id);
    setRol(res.data)
  };

  useEffect(() => {
    loadUser();
  }, []);
  
  return (
    <div className="jumbotron" style={{ textAlign: "center" }}>
      <div>
        <img
          src="https://image.shutterstock.com/image-photo/smiling-cat-business-suit-260nw-219244810.jpg"
          style={{
            width: 180,
            height: 180,
            borderRadius: 100,
            border: 25,
            borderColor: "#000",
          }}
        />
        <h2 className="media-heading">
          {user?.name} {user?.lastName}
        </h2>
      </div>
      <hr className="my-4" />
      <h3>Usuario teletrabajo Green</h3>
      <div style={{textAlign: "center", marginInline:"25%"}}>
        <div className="form-group row">
          <h4>Roles: </h4>
          <h4>{rol}</h4>
        </div>
        <div className="form-group row" >
          <h4>Telefono: </h4>
          <h4>{user?.phone}</h4>
        </div>
        <div className="form-group row">
          <h4>Dirección: </h4>
          <h4>
            {user?.address} {user?.city}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default UserView;
