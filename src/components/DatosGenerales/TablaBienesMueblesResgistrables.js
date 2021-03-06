import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

function CustomizedTable(props) {
  const { classes, data, buttonClick } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Tipo de operación</CustomTableCell>
            <CustomTableCell>Tipo de bien mueble</CustomTableCell>
            <CustomTableCell>Marca</CustomTableCell>
            <CustomTableCell>Submarca, línea o tipo</CustomTableCell>
            <CustomTableCell>Modelo</CustomTableCell>
            <CustomTableCell>Número de serie</CustomTableCell>
            <CustomTableCell>Lugar de registro</CustomTableCell>
            <CustomTableCell>Titular</CustomTableCell>
            <CustomTableCell>Porcentaje de propiedad</CustomTableCell>
            <CustomTableCell>Nombres de copropietarios</CustomTableCell>
            <CustomTableCell>Número de registro vehicular</CustomTableCell>
            <CustomTableCell>Forma de adquisición</CustomTableCell>
            <CustomTableCell>Nombre o razón social de quien se adquirió el bien mueble</CustomTableCell>
            <CustomTableCell>RFC</CustomTableCell>
            <CustomTableCell>Relación</CustomTableCell>
            <CustomTableCell>Sector/Industria</CustomTableCell>
            <CustomTableCell>Fecha de adquisición</CustomTableCell>
            <CustomTableCell>Precio de adquisición</CustomTableCell>
            <CustomTableCell>Moneda</CustomTableCell>
            <CustomTableCell>Observaciones/Comentarios</CustomTableCell>
            <CustomTableCell>Opciones</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => {
            return (
              <TableRow className={classes.row} key={index}>
                <CustomTableCell>{index}-{item.tipo_operacion.valor}</CustomTableCell>
                <CustomTableCell>{item.tipo_bien_mueble.valor}</CustomTableCell>
                <CustomTableCell>{item.marca}</CustomTableCell>
                <CustomTableCell>{item.submarca}</CustomTableCell>
                <CustomTableCell>{item.modelo}</CustomTableCell>
                <CustomTableCell>{item.numero_serie}</CustomTableCell>
                <CustomTableCell>{item.lugar_registro.pais.valor}</CustomTableCell>
                <CustomTableCell>{item.titular_bien.valor}</CustomTableCell>
                <CustomTableCell>{item.porcentaje_propiedad}</CustomTableCell>
                <CustomTableCell>{item.nombres_copropietarios[0]}</CustomTableCell>
                <CustomTableCell>{item.numero_registro_vehicular}</CustomTableCell>
                <CustomTableCell>{item.forma_adquisicion.valor}</CustomTableCell>
                <CustomTableCell>{item.nombre_denominacion_adquirio}</CustomTableCell>
                <CustomTableCell>{item.rfc_quien_adquirio}</CustomTableCell>
                <CustomTableCell>{item.relacion_persona_quien_adquirio.valor}</CustomTableCell>
                <CustomTableCell>{item.sector_industria.valor}</CustomTableCell>
                <CustomTableCell>{item.fecha_adquisicion}</CustomTableCell>
                <CustomTableCell>{item.precio_adquisicion.valor} </CustomTableCell>
                <CustomTableCell>{item.precio_adquisicion.moneda.moneda}</CustomTableCell>
                <CustomTableCell>{item.observaciones}</CustomTableCell>
                  <CustomTableCell>
                    <Button
                      variant="contained"
                      size="small"
                      value={index}
                      onClick={buttonClick(index)}
                    >
                      Eliminar
                    </Button>
                  </CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedTable);
