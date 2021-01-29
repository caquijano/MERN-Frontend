import React, { ChangeEvent, FormEvent, useState } from "react";
import { Expense } from "./Expense";
import * as expenseService from "./expenseService"
import { toast } from "react-toastify";
import { useHistory, } from "react-router-dom";

function ExpenseForm() {

    const initialState = {
        concept: "",
        date: "",
        price: 0,
      };
      const history = useHistory();

    const [expense, setExpense] = useState<Expense>(initialState)
    const handlerInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      ) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
      };
      const handlSubmit = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        await expenseService.createExpense(expense);
        toast.success('Gasto agregado satisfactoriamente')
        history.push('/expenses')
      }
    return (
        <div
      className=" row p-5"
      style={{
        alignItems: "center",
        alignContent: "center",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <div className="card border-primary mb-3" style={{ width: 800 }}>
        <div className="card-header">Gastos </div>
        <div className="card-body">
          <h4 className="card-title">Nuevo Gasto</h4>

          <form onSubmit={handlSubmit} className="form-horizontal">
            <fieldset>
              <div className="row form-group">
                <div className="col-lg-1"></div>
                <label htmlFor="textArea" className="col-lg-2 control-label">
                  Concepto: 
                </label>
                <div className="col-lg-7">
                  <textarea
                    className="form-control"
                    rows={3}
                    name="concept"
                    id="concept"
                    defaultValue={""}
                    onChange={handlerInputChange}
                  />
                </div>
              </div>
              <div className=" row form-group">
                <div className="col-lg-1"></div>
                <label className="col-lg-2 control-label">Fecha</label>
                <div className="col-lg-7">
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    id="date"
                    onChange={handlerInputChange}
                  />
                </div>
              </div>

              <div className=" row form-group">
                <div className="col-lg-1"></div>
                <label className="col-lg-2 control-label">Valor:</label>
                <div className="col-lg-7">
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    id="price"
                    placeholder="$0.00"
                    onChange={handlerInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-lg-10 col-lg-offset-2">
                  <button type="reset" className="btn btn-default">
                  </button>
                  <button  type="submit" className="btn btn-primary" >
                    Agregar
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
    )
}

export default ExpenseForm
