import React, {
  useState,
  FormEvent,
  ChangeEvent,
  useEffect,
  useRef,
} from "react";
import { User } from "./User";
import { toast } from "react-toastify";
import * as userService from "./userService";
import { Modal, Button } from "react-bootstrap";

function Register(props: any) {
  const { setLg } = props;
  const initialState = {
    name: "",
    roles: ["user"],
    email: "",
    password: "",
    repeatPassword: "",
    lastName: "",
    address: "",
    city: "",
    phone: "",
    photo: "",
  };
  const [validate, setValidate] = useState(true);
  const [user, setUser] = useState<User>(initialState);
  const [btn, setBtn] = useState(false);
  const [codigo, setCodigo] = useState({
    codeVerify: 0,
  });
  const [show, setShow] = useState(false);
  const [random, setRandom] = useState(0);

  let random2: number;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeForm = async () => {
    setLg(true);
  };
  const handlerInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {

    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handlerInputChange2 = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setCodigo({ ...codigo, [e.target.name]: e.target.value });
  };

  const handlSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      user.name &&
      user.lastName &&
      user.email &&
      user.city &&
      user.address &&
      user.phone
    ) {
      random2 = Math.floor(Math.random() * (9999 - 1000) + 1000);
      setRandom(random2);
      await userService.sendEmail(random2, user);
      handleShow();
    } else {
      toast.error("Todos los campos son requeridos");
    }
  };
  const saveUser = async () => {
    let code: number = codigo.codeVerify;
    if (`${code}` === `${random}`) {
      const sessionData = await userService.createUser(user);
      if (sessionData.status === 200) {
        const token: any = sessionData.data;
        window.localStorage.setItem("loggedGreenUser", JSON.stringify(token));
        window.location.href = "/activosform";
        toast.success("Bienvenido");
      } else {
        return toast.error(
          "Ocurrio un problema mientras se realizaba la petición"
        );
      }
    } else {
      return toast.error("Codigo incorrecto, realice de nuevo el proceso");
    }
    toast.success("Usuario creado satisfactoriamente");
  };
  //console.log(inputRef);
  const passEqual = async () => {
    if (user.password === user.repeatPassword) {
      setValidate(true);
      setBtn(true);
    } else {
      setBtn(false);
      setValidate(false);
    }
  };
  useEffect(() => {
    passEqual();
  }, [user.password]);
  return (
    <div
      className=" card form-group col-lg-12"
      style={{ paddingTop: "2%", paddingBottom: "2%" }}
    >
      <div className=" card form-group col-lg-12">
        <form onSubmit={handlSubmit}>
          <h3>Registro</h3>

          <div className="form-group row">
            <div className="col-lg-6">
              <label>Nombre </label>
              <input
                name="name"
                placeholder="Nombre"
                className="form-control"
                onChange={handlerInputChange}
              />
            </div>
            <div className="col-lg-6">
              <label>Apellidos </label>
              <input
                placeholder="Apellidos"
                name="lastName"
                className="form-control"
                onChange={handlerInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-6">
              <label>Email </label>
              <input
                type="email"
                placeholder="name@green.com"
                name="email"
                className="form-control"
                onChange={handlerInputChange}
              />
            </div>
            <div className="col-lg-6">
              <label>Telefono </label>
              <input
                placeholder="Numero de telefono"
                name="phone"
                className="form-control"
                onChange={handlerInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-6">
              <label>Ciudad de residencia </label>
              <input
                name="city"
                placeholder="Ciudad de residencia"
                className="form-control"
                onChange={handlerInputChange}
              />
            </div>
            <div className="col-lg-6">
              <label>Dirección </label>
              <input
                placeholder="Direccion"
                name="address"
                className="form-control"
                onChange={handlerInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-6">
              <label>Contraseña </label>
              <input
                className="form-control"
                name="repeatPassword"
                placeholder="Contraseña"
                type="password"
                id="password"
                onChange={handlerInputChange}
              />
            </div>
            <div className="col-lg-6">
              <label>Repetir contraseña </label>
              <input
                className="form-control"
                name="password"
                placeholder="Repetir Contraseña"
                type="password"
                id="repeatPassword"
                onChange={handlerInputChange}
              />
            </div>
          </div>
          {user.password ? (
            <div>
              {validate ? (
                <div>
                  <p style={{ color: "green" }}>Coinciden las contraseñas</p>
                </div>
              ) : (
                <div>
                  <p style={{ color: "red" }}>No coinciden las contraseñas</p>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
          {btn &&
          user.name &&
          user.lastName &&
          user.email &&
          user.city &&
          user.address &&
          user.phone &&
          user.password ? (
            <button type="submit" className="btn btn-primary btn-block">
              Registrarse
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary btn-block"
              disabled
            >
              Registrarse
            </button>
          )}

          <div style={{ justifyContent: "flex-end" }}>
            <div>
              <button className="btn btn-link" onClick={changeForm}>
                Already have an account? Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Verificación de Cuenta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Por favor digita el correo electronico que digitaste para validar
            que es tu email.
            <input
              placeholder="Codigo de verificación "
              type="number"
              name="codeVerify"
              onChange={handlerInputChange2}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={saveUser}>
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default Register;
