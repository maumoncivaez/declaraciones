import React, {Component} from 'react';
import axios from 'axios';
import config from '../../config.json';

//Grid
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import Menu from '../Menu';
import Formulario from "./Formulario";

var loggedIn = sessionStorage.getItem('logged');

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Index extends Component {
  state = {
    message:"",
    type:"",
    ciudades: [],
    entidades: [],
    municipios:[],
    localidades:[],
    tipovialidad:[],
    estadosciviles:[],
    regimen:[],
    startDate: moment(),
    "nombres": "Carlos",
    "primer_apellido": "Pérez",
    "segundo_apellido": "López",
    "nacionalidad": [],
    "nacionalidades": [{
      "valor": "México",
      "codigo": "MX"
    }],
    "pais_nacimiento_valor":"",
    "pais_nacimiento": {
      "valor": "México",
      "codigo": "MX"
    },
    "entidad_federativa_nacimiento": {
      "nom_ent": "México",
      "cve_ent": "15"
    },
    "curp": "BEML920313HMCLNS09",
    "rfc": "GOAP780710RH7",
    "fecha_nacimiento": "31/07/1980",
    "numero_identificacion_oficial": "a1b2c3d4",
    "correo_electronico": {
      "personal": "jperez@ejemplo.com.mx",
      "laboral": "jperez@ejemplo.com.mx"
    },
    "telefono": {
      "personal": "+525510203040",
      "celular": "+525510203040"
    },


    "estado_civil": {
      "codigo": "CAS",
      "valor": "Casado (a)"
    },

    "dom_pais": {
      "valor": "México",
      "codigo": "MX"
    },
    "dom_entidad_federativa": {
      "nom_ent": "México",
      "cve_ent": "15"
    },
    "dom_municipio": {
      "nom_mun": "Ecatepec de Morelos",
      "cve_mun": "033"
    },
    "dom_localidad": {
      "nom_loc": "Ecatepec de Morelos",
      "cve_loc": "0001"
    },
    "dom_cp": "55018",
    "dom_vialidad": {
      "codigo":"CALLE",
      "valor":"CALLE",
      "tipo_vial": "CALLE",
      "nom_vial": "El Rosal"
    },
    "dom_numExt": "24",
    "dom_numInt": "48",


    "regimen_matrimonial": {
      "codigo": "SBI",
      "valor": "Separación de bienes"
    },
    "fecha_declaracion": "31/07/1980"
  };

  handleClick = () => event => {
    var data={
    "nombres": this.state.nombres,
    "primer_apellido": this.state.primer_apellido,
    "segundo_apellido": this.state.segundo_apellido,
    "nacionalidades": this.state.nacionalidades,
    "pais_nacimiento": this.state.pais_nacimiento,
    "entidad_federativa_nacimiento": this.state.entidad_federativa_nacimiento,
    "curp": this.state.curp,
    "rfc": this.state.rfc,
    "fecha_nacimiento": this.state.fecha_nacimiento,
    "numero_identificacion_oficial": this.state.numero_identificacion_oficial,
    "correo_electronico": this.state.correo_electronico,
    "telefono": this.state.telefono,
    "domicilio": {
      "pais": this.state.dom_pais,
      "entidad_federativa": this.state.dom_entidad_federativa,
      "municipio": this.state.dom_municipio,
      "cp": this.state.dom_cp,
      "localidad": this.state.dom_localidad,
      "vialidad": this.state.dom_vialidad,
      "numExt": this.state.dom_numExt,
      "numInt": this.state.dom_numInt,
    },
    "estado_civil": this.state.estado_civil,
    "regimen_matrimonial": this.state.regimen_matrimonial,
    "fecha_declaracion": moment().format("YYYY-MM-DD")
  };
    console.log(data);

    var apiBaseUrl = config.apiHost;
    var self = this;
    var info;

    axios.post(apiBaseUrl + 'declaraciones', data).then(function(response) {
      // console.log(response);
      switch (response.data.code) {
        case 200:
          info={message: 'Los datos se guardaron correctamente.',type:"alert alert-success text-center"};
          self.setState(info);
          break;
        default:
          info={message: 'hubo un error al guardar la informacion intenten nuevamente.',type:"alert alert-danger text-center"};
          self.setState(info);
      }
    }).catch(function(error) {
      console.log(error);
    });




  };

  handleChange = name => event => {

    var ciudades=event.target.value;
    var nacionalidad=[];
    for (var index in ciudades) {
      var ciudad=ciudades[index];
      var valor=this.state.ciudades.filter(x => x.codigo === ciudad);

      delete valor[0]._id;
      nacionalidad.push(valor);
      // console.log(nacionalidad);
    }

    this.setState({nacionalidades:nacionalidad});
      this.setState({
          [name]: event.target.value,
      });
      // console.log(event.target.value);
  };

  handleChangeTipoVialidad = name => event => {
      const valor = this.state.tipovialidad.filter(x => x.codigo === event.target.value);

      this.setState({
          [name]:{
            valor: valor[0].valor,
            tipo_vial: valor[0].valor,
            codigo: valor[0].codigo,
            nom_vial: this.state.dom_vialidad.nom_vial,
          }
      });
  };

  handleChangeNombreVialidad = () => event => {
      this.setState({
          dom_vialidad:{
            valor: this.state.dom_vialidad.valor,
            tipo_vial: this.state.dom_vialidad.valor,
            codigo: this.state.dom_vialidad.codigo,
            nom_vial: event.target.value,
          }
      });

      console.log(this.state.dom_vialidad);
  };

  handleChangeDirPais = name => event => {
      const valor = this.state.ciudades.filter(x => x.codigo === event.target.value);

      this.setState({
          [name]:{
            valor: valor[0].valor,
            codigo: valor[0].codigo,
          }
      });
  };

  handleChangeEdoCivil = name => event => {
      const valor = this.state.estadosciviles.filter(x => x.codigo === event.target.value);

      this.setState({
          [name]:{
            valor: valor[0].valor,
            codigo: valor[0].codigo,
          }
      });
  };

  handleChangeRegimen = name => event => {
      const valor = this.state.regimen.filter(x => x.codigo === event.target.value);

      this.setState({
          [name]:{
            valor: valor[0].valor,
            codigo: valor[0].codigo,
          }
      });
  };

  handleChangeEntidades = name => event => {
      const valor = this.state.entidades.filter(x => x.cve_ent === event.target.value);

      fetch(config.apiHost+'municipios?cve_ent='+event.target.value)
        .then(res => res.json())
        .then(municipios => this.setState({municipios:municipios}));

      this.setState({
          [name]:{
            nom_ent: valor[0].nom_ent,
            cve_ent: valor[0].cve_ent,
          }
      });


  };


  handleChangeMunicipios = name => event => {
      const valor = this.state.municipios.filter(x => x.cve_mun === event.target.value);

      fetch(config.apiHost+'localidades?cve_ent='+this.state.dom_entidad_federativa.cve_ent+'&cve_mun='+event.target.value)
        .then(res => res.json())
        .then(localidades => this.setState({localidades:localidades}));

      this.setState({
          [name]:{
            nom_mun: valor[0].nom_mun,
            cve_mun: valor[0].cve_mun,
          }
      });
  };

  handleChangeLocalidades = name => event => {
      const valor = this.state.localidades.filter(x => x.cve_loc === event.target.value);

      this.setState({
          [name]:{
            nom_loc: valor[0].nom_loc,
            cve_loc: valor[0].cve_loc,
          }
      });
  };

  handleChangeFecha(date) {
    const fecha = moment(date,'MM/DD/YYYY').format("DD-MM-YYYY");
    console.log(fecha);
    console.log(date);
    this.setState({
      fecha_nacimiento: fecha
    });
  }

  componentDidMount() {
    fetch(config.apiHost+'ciudades')
      .then(res => res.json())
      .then(ciudades => this.setState({ciudades:ciudades}));

    fetch(config.apiHost+'entidades')
      .then(res => res.json())
      .then(entidades => this.setState({entidades:entidades}));

    fetch(config.apiHost+'estadosciviles')
      .then(res => res.json())
      .then(estadosciviles => this.setState({estadosciviles:estadosciviles}));

    fetch(config.apiHost+'regimenmatrimonial')
      .then(res => res.json())
      .then(regimenmatrimonial => this.setState({regimen:regimenmatrimonial}));

    fetch(config.apiHost+'municipios?cve_ent='+this.state.dom_entidad_federativa.cve_ent)
      .then(res => res.json())
      .then(municipios => this.setState({municipios:municipios}));

    fetch(config.apiHost+'localidades?cve_ent='+this.state.dom_entidad_federativa.cve_ent+'&cve_mun='+this.state.dom_municipio.cve_mun)
      .then(res => res.json())
      .then(localidades => this.setState({localidades:localidades}));


    fetch(config.apiHost+'tipovialidad')
      .then(res => res.json())
      .then(tipovialidad => this.setState({tipovialidad:tipovialidad}));


  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Menu loggedIn={loggedIn} />
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        {/*<Grid item xs={1} >
          <Menu2 />
        </Grid>*/}
        <Grid item xs={12} >
          <Formulario
          data={this.state}
          handleChange={this.handleChange}
          handleChangeEntidades={this.handleChangeEntidades}
          handleChangeFecha={this.handleChangeFecha}
          handleChangeEdoCivil={this.handleChangeEdoCivil}
          handleChangeRegimen={this.handleChangeRegimen}
          handleChangeDirPais={this.handleChangeDirPais}
          handleChangeMunicipios={this.handleChangeMunicipios}
          handleChangeLocalidades={this.handleChangeLocalidades}
          handleChangeTipoVialidad={this.handleChangeTipoVialidad}
          handleChangeNombreVialidad={this.handleChangeNombreVialidad}

          handleClick={this.handleClick}
          />
        </Grid>
      </Grid>
    </div>
    );
  }
}

export default withStyles(styles)(Index);