import React, { Fragment } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { map } from 'lodash';
import { DropzoneArea } from 'material-ui-dropzone';
import Button from 'components/CustomButtons/Button';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import TextField from 'components/Form/TextField';
import PropTypes from 'prop-types';

export default function CreateModal({ textFields, onChangeFiles, open, onClose, onSubmit }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ajouter une oeuvre</DialogTitle>
      <DialogContent>
        <GridContainer spacing={3}>
          {map(textFields, ({ content, ...rest }, key) => (
            <Fragment key={key}>
              <GridItem xs={6}>
                <DialogContentText style={{ marginTop: '10%' }}>{content}</DialogContentText>
              </GridItem>
              <GridItem xs={6}>
                <TextField {...rest} />
              </GridItem>
            </Fragment>
          ))}
        </GridContainer>
        <DropzoneArea
          acceptedFiles={['image/*']}
          maxFileSize={300000000}
          filesLimit={5}
          onChange={onChangeFiles}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="transparent">
          Annuler
        </Button>
        <Button onClick={onSubmit} color="primary">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  textFields: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      label: PropTypes.string,
      type: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      onChange: PropTypes.func
    })
  ).isRequired,
  onChangeFiles: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
