import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../../services/api';

export default function Parts(){

  const[my_parts, setParts] = useState([]);
  const navigate = useNavigate();

  // read, lista os registros da api
  useEffect(() => {
    api.get('api/v1/parts',{})
    .then(response => {setParts(response.data)})
  },[]);

  // update, navega para NewUpdate
  async function updatePart(id){
    try {
      navigate(`/newupdate/${id}`);      
    } catch (error) {
      alert("Erro ao navegar para Newupdate");      
    }
  }

  // delete, exclui um registro
  async function deletePart(id){
    try {
      await api.delete(`api/v1/parts/${id}`,{});
      setParts(my_parts.filter(part => part.id !== id));
    } catch (error) {
      alert('Erro ao excluir');      
    }
  }

  return(
    <div data-testid="mycard" className="card border-primary" style={{marginTop: '20px'}} >
      <div className="card-header bg-primary" style={{color: '#fff'}}>
        Parts Crud
      </div>
      <div className="card-body">

        <Link data-testid="mylink" className="btn btn-success" 
        style={{marginBottom: '10px'}} to="/newupdate/0">Novo</Link>

        <table data-testid="mytable" className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Peça</th>
              <th scope="col">Função</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {my_parts.map(part => (
              <tr key={part.id}>
                <th scope="row">{part.id}</th>
                  <td>{part.name}</td>
                  <td>{part.function}</td>
                  <td>

                    <button data-testid="mybtn1" type="button"
                    className="btn btn-outline-info" style={{margin: '2px'}}
                    onClick={() => updatePart(part.id)}>Editar</button>

                    <button data-testid="mybtn2" type="button"
                    className="btn btn-outline-danger" style={{margin: '2px'}}
                    onClick={() => deletePart(part.id)}>Excluir</button>

                  </td>
              </tr>
            ))}
            
          </tbody>
        </table>

      </div>
    </div>
  );

}