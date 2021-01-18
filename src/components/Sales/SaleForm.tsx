import React from "react";
import { BsX} from 'react-icons/bs';

const SaleForm = () => {
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
        <div className="form-group col-lg-5"></div>
        <br />
        <div className="card border-primary mb-3" style={{ width: 1000 }}>
          <div className="card-header">Sistema de ventas</div>
          <br />
          <h4>Nueva venta</h4>
          <br />
          <div className="form-group col-lg-12 row">
            <label className="col-form-label col-lg-1" htmlFor="inputDefault">
              Cliente{" "}
            </label>
            <input
              type="text"
              className="form-control col-lg-4"
              placeholder="Nombre del cliente"
              id="inputDefault"
            />
            <label className="col-form-label col-lg-1" htmlFor="inputDefault">
              Fecha:{" "}
            </label>
            <input
              type="Date"
              className="form-control col-lg-2"
              placeholder="Nombre del cliente"
              id="inputDefault"
            />
            <label className="col-form-label col-lg-2" htmlFor="inputDefault">
              Numero de factura:{" "}
            </label>
            <input
              type="text"
              className="form-control col-lg-1"
              placeholder="001"
              id="inputDefault"
            />
          </div>
          <div className="card-body">
            <div
              className="card border-success col-lg-12"
              style={{ maxWidth: "60rem" }}
            >
              <div className="card-body">
                <div className="form-group row col-lg-12">
                  <div className="form-group col-lg-4">
                    <label className="col-form-label" htmlFor="inputDefault">
                      Articulo
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Default input"
                      id="inputDefault"
                    />
                  </div>
                  <div className="form-group col-lg-2">
                    <label className="col-form-label" htmlFor="inputDefault">
                      Cantidad
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Default input"
                      id="inputDefault"
                    />
                  </div>
                  <div className="form-group col-lg-2">
                    <fieldset disabled>
                      <label className="control-label" htmlFor="disabledInput">
                        Stock
                      </label>
                      <input
                        className="form-control"
                        id="disabledInput"
                        type="text"
                        placeholder="20"
                        disabled
                      />
                    </fieldset>
                  </div>
                  <div className="form-group col-lg-2">
                  <fieldset disabled>
                      <label className="control-label" htmlFor="disabledInput">
                        Precio sugerido
                      </label>
                      <input
                        className="form-control"
                        id="disabledInput"
                        type="text"
                        placeholder="25000"
                        disabled
                      />
                    </fieldset>
                  </div>
                  <div className="form-group col-lg-2">
                    <label className="col-form-label" htmlFor="inputDefault">
                      Precio venta
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Default input"
                      id="inputDefault"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Agregar</button>
                <br/>
                <br/>
                <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Opciones</th>
                  <th scope="col">Articulo</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio venta</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
                    <tbody>
                      <tr>
                        <td>
                        <button style={{marginRight: 5}} className="btn btn-danger btn-sm"> <BsX/></button>
                        </td>
                        <td>Arena lavada</td>
                        <td>3</td>
                        <td>$28.000</td>
                        <td>$84.000 </td>
                        
                      </tr>
                    </tbody>
            </table>
              </div>
            </div>
            
            <button type="submit" className="btn btn-success" style={{margin: 20}}>Guardar</button>
            <button type="submit" className="btn btn-danger" style={{}}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleForm;
