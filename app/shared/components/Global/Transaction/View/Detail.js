// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Label, Table } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';
import { get } from 'dot-prop-immutable';

export class GlobalTransactionViewDetail extends Component<Props> {
  render() {
    const {
      expired,
      signed,
      t,
      transaction
    } = this.props;
    const {
      data,
    } = transaction;
    return (
      <Table definition size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              {t('property')}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {t('value')}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell collapsing>
              {t('global_transaction_view_count')}
            </Table.Cell>
            <Table.Cell>
              1
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              {t('global_transaction_view_action_count')}
            </Table.Cell>
            <Table.Cell>
              {get(data, 'transaction.transaction.actions', []).length}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              {t('global_transaction_view_expiration')}
            </Table.Cell>
            <Table.Cell>
              <p>
                <TimeAgo date={`${get(data, 'transaction.transaction.expiration')}z`} />
                {' '}
                ({get(data, 'transaction.transaction.expiration')} UTC)
              </p>
              {(expired)
                ? (
                  <React.Fragment>
                    <Label
                      basic
                      color="red"
                      content={t('global_transaction_view_is_expired')}
                    />
                  </React.Fragment>
                )
                : false
              }
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              {t('global_transaction_view_status')}
            </Table.Cell>
            <Table.Cell>
              {(signed)
                ? (
                  <Label
                    basic
                    color="green"
                    content={t('global_transaction_view_is_signed')}
                    size="large"
                  />
                )
                : (
                  <Label
                    basic
                    color="orange"
                    content={t('global_transaction_view_is_unsigned')}
                    size="large"
                  />
                )
              }
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default translate('global')(GlobalTransactionViewDetail);
