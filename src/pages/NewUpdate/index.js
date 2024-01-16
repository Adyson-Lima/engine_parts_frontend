import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../../services/api';

export default function NewUpdate(){

  const[name, setName] = useState('');
  const[my_function, setFunction] = useState('');
  const navigate = useNavigate();
  
  // part_id definido na rota NewUpdate
  const{part_id} = useParams();

  async function saveOrUpdate(e){

    e.preventDefault();

    const data = {name, my_function};

    if (part_id === '0') {
      try {
        await api.post('api/v1/parts', data, {});
        navigate('/');        
      } catch (error) {
        alert('Erro ao salvar');        
      }      
    } else {
      try {
        await api.patch(`api/v1/parts/${part_id}`, data, {});
        navigate('/');
      } catch (error) {
        alert('Erro ao atualizar');        
      }      
    }
  }

  // carrega dados na api e seta dados para atualização
  async function loadPart(){
    try {
      const response = await api.get(`api/v1/parts/${part_id}`, {});
      setName(response.data.name);
      setFunction(response.data.my_function);
    } catch (error) {
      alert('Erro ao buscar registro');
      navigate('/');      
    }
  }

  // chama loadPart e preenche form
  useEffect(() => {
    if (part_id === '0') {
      return;      
    } else {
      loadPart();      
    }
  }, [part_id]);


  return(

    <div data-testid="mycard" className="card border-primary" style={{marginTop: '20px'}} >
      <div className="card-header bg-primary" style={{color: '#fff'}}>
        Parts Crud
      </div>
      <div className="card-body">

        <Link data-testid="mylink" className="btn btn-dark" 
        style={{marginBottom: '5px'}} to="/">Home</Link>

        <form data-testid="myform" onSubmit={saveOrUpdate}>

          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input data-testid="input1" id="name" type="text" 
            style={{marginBottom: '20px'}} className="form-control" 
            placeholder="Nome" value={name}
            onChange={e => setName(e.target.value)}></input>
          </div>

          <div className="form-group">
            <label htmlFor="function">Função</label>
            <input data-testid="input2" id="function" type="text" 
            style={{marginBottom: '20px'}} className="form-control" 
            placeholder="Função" value={my_function}
            onChange={e => setFunction(e.target.value)}></input>
          </div>  

          <button data-testid="btnenviar" type="submit" className="btn btn-primary">Enviar</button>
          
        </form>

      </div>
    </div>

  );

}