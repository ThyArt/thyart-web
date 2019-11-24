import React, { Fragment, useState } from 'react';
import Button from 'components/CustomButtons/Button';
import Table from 'components/Table/Table';
import { GetAllNewsletters, CreateNewsletter } from 'http/Newsletters';

function Newsletters() {
  const [{ data: newsletters }, refresh] = GetAllNewsletters();
  const [{ data: createData }, createNewsletter] = CreateNewsletter.hook();
  const [key, setKey] = useState(Math.random());

  const header = ['Date de la newsletter', 'Details'];

  const formatResult = () => {
    console.log(newsletters.data);
    return ([]);
  };

  const handleCreateNewsletter = () => {
    CreateNewsletter.execute(createNewsletter);
  };

  return (
    <Fragment>
      <Button type="button" color="primary" onClick={handleCreateNewsletter}>
        Créer une newsletter
      </Button>

      {newsletters ? <Table header={header} key={key} rows={formatResult()} /> : null}
    </Fragment>
  );
}

export default Newsletters;
