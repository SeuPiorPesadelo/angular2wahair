import {Cliente} from './cliente';
import {Funcionario} from './funcionario';
import {Servico} from './servico';

export class Atendimento  {

    id: number;
    cliente: Cliente;
    funcionarios: Funcionario[];
    servicos: Servico[];
    pago: boolean;
    total: number;
}