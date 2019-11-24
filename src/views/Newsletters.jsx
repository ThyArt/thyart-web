import React, { Fragment, useEffect, useState } from 'react';
import Button from 'components/CustomButtons/Button';
import Table from 'components/Table/Table';
import { GetAllNewsletters, CreateNewsletter } from 'http/Newsletters';
import { each } from 'lodash';

function Newsletters() {
  const [{ data: getNewsletters }, refresh] = GetAllNewsletters();
  const [{ data: responseCreate }, createNewsletter] = CreateNewsletter.hook();
  const [key, setKey] = useState(Math.random());
  const [newsletters, setNewsletters] = useState([]);

  const header = ['Sujet de la newsletter', 'Description', 'Nombre de clients'];

  useEffect(() => {
    if (responseCreate) {
      refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseCreate]);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setNewsletters(getNewsletters);
    setKey(Math.random());
  }, [getNewsletters]);

  const formatResult = () => {
    if (!newsletters) return [];
    let tmp = [];
    each(newsletters['data'], newsletter => {
      tmp.push({
        id: newsletter.id,
        subject: newsletter.subject,
        description: newsletter.description,
        clientsNumber: newsletter.customer_list.length
      });
    });
    return tmp;
  };

  const handleCreateNewsletter = () => {
    CreateNewsletter.execute(createNewsletter);
  };

  return (
    <Fragment>
      <Button type="button" color="primary" onClick={handleCreateNewsletter}>
        Créer une newsletter
      </Button>

      { getNewsletters ? <Table header={header} key={key} rows={formatResult()} /> : null }
    </Fragment>
  );
}

export default Newsletters;
