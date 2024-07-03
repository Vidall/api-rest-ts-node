import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export const seed = async (knex: Knex) => {

  const [{ count }] = await knex(ETableNames.cidade).count<[{ count: number }]>('* as count');

  if ( !Number.isInteger(count) || Number(count) > 0 ) return;

  const cidadesToInsert = cidadesDoRJ.map(item => ({ nome: item}));
  await knex(ETableNames.cidade).insert(cidadesToInsert);
};

const cidadesDoRJ = [
  'Angra dos Reis',
  'Aperibé',
  'Araruama',
  'Areal',
  'Armação de Búzios',
  'Arraial do Cabo',
  'Barra do Piraí',
  'Barra Mansa',
  'Belford Roxo',
  'Bom Jardim',
  'Bom Jesus do Itabapoana',
  'Cabo Frio',
  'Cachoeiras de Macacu',
  'Cambuci',
  'Campos dos Goytacazes',
  'Cantagalo',
  'Carapebus',
  'Cardoso Moreira',
  'Carmo',
  'Casimiro de Abreu',
  'Comendador Levy Gasparian',
  'Conceição de Macabu',
  'Cordeiro',
  'Duas Barras',
  'Duque de Caxias',
  'Engenheiro Paulo de Frontin',
  'Guapimirim',
  'Iguaba Grande',
  'Itaboraí',
  'Itaguaí',
  'Italva',
  'Itaocara',
  'Itaperuna',
  'Itatiaia',
  'Japeri',
  'Laje do Muriaé',
  'Macaé',
  'Macuco',
  'Magé',
  'Mangaratiba',
  'Maricá',
  'Mendes',
  'Mesquita',
  'Miguel Pereira',
  'Miracema',
  'Natividade',
  'Nilópolis',
  'Niterói',
  'Nova Friburgo',
  'Nova Iguaçu',
  'Paracambi',
  'Paraíba do Sul',
  'Parati',
  'Paty do Alferes',
  'Petrópolis',
  'Pinheiral',
  'Piraí',
  'Porciúncula',
  'Porto Real',
  'Quatis',
  'Queimados',
  'Quissamã',
  'Resende',
  'Rio Bonito',
  'Rio Claro',
  'Rio das Flores',
  'Rio das Ostras',
  'Rio de Janeiro',
  'Santa Maria Madalena',
  'Santo Antônio de Pádua',
  'São Fidélis',
  'São Francisco de Itabapoana',
  'São Gonçalo',
  'São João da Barra',
  'São João de Meriti',
  'São José de Ubá',
  'São José do Vale do Rio Preto',
  'São Pedro da Aldeia',
  'São Sebastião do Alto',
  'Sapucaia',
  'Saquarema',
  'Seropédica',
  'Silva Jardim',
  'Sumidouro',
  'Tanguá',
  'Teresópolis',
  'Trajano de Morais',
  'Três Rios',
  'Valença',
  'Varre-Sai',
  'Vassouras',
  'Volta Redonda'
];