import React from 'react';
import { PropTypes } from 'prop-types';
import cx from 'classnames';

import Label from '@stackstorm/module-label';
import PackIcon from '@stackstorm/module-pack-icon';

export default class RulesFlexCard extends React.Component {
  static propTypes = {
    rule: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    selected: false,
  }

  static contextTypes = {
    scrollIntoView: PropTypes.func,
  }

  render() {
    const { rule, selected, onClick } = this.props;

    return (
      <div
        className={cx('st2-flex-card', {
          'st2-flex-card--active': selected,
        })}
        onClick={onClick}
        data-test={`rule rule:${rule.ref}`}
        ref={selected ? this.context.scrollIntoView : null}
      >
        <div className="st2-flex-card__header">
          <div className="st2-flex-card__header-status st2-flex-card__column">
            <Label status={rule.enabled ? 'enabled' : 'disabled'} />
          </div>
          <div className="st2-flex-card__column">
            <div className="st2-flex-card__header-primary" title={rule.ref}>
              { rule.name }
            </div>
            <div className="st2-flex-card__header-secondary">
              { rule.description }
            </div>
          </div>
        </div>
        <div className="st2-flex-card__row">
          <div className="st2-flex-card__column st2-flex-card__if">
            <div className="st2-rules__column-trigger" title={rule.trigger.type}>
              <span className="st2-rules__label">If</span>
              <PackIcon name={rule && rule.trigger.type.split('.')[0]} />

              <span className="st2-rules__name">
                { rule.trigger.type }
              </span>
              { rule.trigger.description ? (
                <span className="st2-rules__description">
                  { rule.trigger.description }
                </span>
              ) : null }
            </div>
          </div>
          <div className="st2-flex-card__column st2-flex-card__then">
            <div className="st2-rules__column-action" title={rule.action.ref}>
              <span className="st2-rules__label">Then</span>
              <PackIcon name={rule && rule.action.ref.split('.')[0]} />

              <span className="st2-rules__name">
                { rule.action.ref }
              </span>
              <span className="st2-rules__description">
                { rule.action.description }
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
