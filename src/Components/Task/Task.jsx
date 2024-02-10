import React, { Component } from 'react';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  state = {
    value: this.props.label,
  };

  render() {
    const {
      label,
      onDeleted,
      done,
      onToggleDone,
      created,
      status,
      onEditClick,
      onEdit,
      id,
      min,
      sec,
      timerPlay,
      timerPause,
    } = this.props;
    const timer = formatDistanceToNow(created, {
      addSuffix: true,
      includeSeconds: true,
    });
    let classNames = '';
    let isChecked = '';
    if (done) {
      classNames += ' completed';
      isChecked += 'checked';
    }
    if (status) {
      classNames += ' editing';
    }

    return (
      <li className={classNames}>
        {status === '' && (
          <div className="view">
            <input className="toggle" type="checkbox" onChange={onToggleDone} checked={isChecked} />
            <label>
              <span className="title" onClick={onToggleDone}>
                {label}
              </span>
              <span className="description">
                <button className="icon icon-play" onClick={() => timerPlay(id)} />
                <button className="icon icon-pause" onClick={() => timerPause(id)} />
                <span>
                  &nbsp; &nbsp;
                  {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
                </span>
              </span>
              <span className="description">{`created ${timer}`}</span>
            </label>
            <button className="icon icon-edit" onClick={onEditClick}></button>
            <button className="icon icon-destroy" onClick={onDeleted}></button>
          </div>
        )}

        {status === 'edit' && (
          <form onSubmit={(e) => onEdit(e, id, this.state.value)}>
            <input
              type="text"
              className="edit"
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
          </form>
        )}
      </li>
    );
  }

  static defaultProps = {
    label: '',
    onDeleted: () => {},
    done: false,
    onToggleDone: () => {},
    created: new Date(),
    status: '',
    onEditClick: () => {},
    onEdit: () => {},
  };

  static propTypes = {
    label: PropTypes.string,
    onDeleted: PropTypes.func,
    done: PropTypes.bool,
    onToggleDone: PropTypes.func,
    created: PropTypes.object,
    status: PropTypes.string,
    onEditClick: PropTypes.func,
    onEdit: PropTypes.func,
    id: PropTypes.number,
  };
}
