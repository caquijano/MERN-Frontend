import { useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "./User";
import * as userService from "./userService";

function Modal() {

    interface Params {
        id?: any;
      }
      const params = useParams<Params>();
      const [user, setUser] = useState<User>();
      const loadUser = async () => {
        const res = await userService.getUser(params.id);
        const {name, lastName, email, address, city, phone, roles, photo} = res.data
        setUser(res.data);
      };
    return (
        <div>
  {/* Button trigger modal */}
  <button type="button" className="btn btn-primary" data-toggle="modal">
    Launch demo modal
  </button>
  {/* Modal */}
  <div className="modal fade show" tabIndex={-1} role="dialog" style={{display: "block", }} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          ...
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>

    )
    
}
export default Modal
