import React from 'react';
import moment from 'moment';
import RcTimePicker from 'rc-time-picker/lib/TimePicker';
import classNames from 'classnames';
import injectLocale from './locale-provider/injectLocale';
import defaultLocale from './locale/zh_CN';

export function generateShowHourMinuteSecond(format: string) {
  // Ref: http://momentjs.com/docs/#/parsing/string-format/
  return {
    showHour: (
      format.indexOf('H') > -1 ||
        format.indexOf('h') > -1 ||
        format.indexOf('k') > -1
    ),
    showMinute: format.indexOf('m') > -1,
    showSecond: format.indexOf('s') > -1,
  };
}

export interface TimePickerProps {
  className?: string;
  size?: 'large' | 'default' | 'small';
  value?: moment.Moment;
  defaultValue?: moment.Moment;
  open?: boolean;
  format?: string;
  onChange?: (time: moment.Moment, timeString: string) => void;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  placeholder?: string;
  prefixCls?: string;
  hideDisabledOptions?: boolean;
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  style?: React.CSSProperties;
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
  addon?: Function;
  use12Hours?: boolean;
}

class TimePicker extends React.Component<TimePickerProps, any> {
  static defaultProps = {
    prefixCls: 'ant-time-picker',
    align: {
      offset: [0, -2],
    },
    disabled: false,
    disabledHours: undefined,
    disabledMinutes: undefined,
    disabledSeconds: undefined,
    hideDisabledOptions: false,
    placement: 'bottomLeft',
    transitionName: 'slide-up',
  };

  timePickerRef: any;

  constructor(props: TimePickerProps) {
    super(props);
    const value = props.value || props.defaultValue;
    if (value && !moment.isMoment(value)) {
      throw new Error(
        'The value/defaultValue of TimePicker must be a moment object after `antd@2.0`, ' +
        'see: https://u.ant.design/time-picker-value',
      );
    }
    this.state = {
      value,
    };
  }

componentName = () => (
  function<P>(Component: typeof React.Component): React.ComponentClass<P> {
    const ComponentWithStatics = Component;
    return class extends Component<P & ComponentProps, any> {
      static propTypes = ComponentWithStatics.propTypes;
      static defaultProps = ComponentWithStatics.defaultProps;
      static contextTypes = {
        ...(ComponentWithStatics.context || {}),
      };

      context: ComponentContext;

      getLocale() {
        const { antLocale } = this.context;
        const localeFromContext = antLocale;
        const localeFromProps: any = this.props.locale || {};
        return {
          ...defaultLocale,
          ...(localeFromContext || {}),
          ...localeFromProps,
        };
      }
    };
  }
);

  componentWillReceiveProps(nextProps: TimePickerProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange = (value: moment.Moment) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    const { onChange, format = 'HH:mm:ss' } = this.props;
    if (onChange) {
      onChange(value, (value && value.format(format)) || '');
    }
  }

  handleOpenClose = ({ open }) => {
    const { onOpenChange } = this.props;
    if (onOpenChange) {
      onOpenChange(open);
    }
  }

  saveTimePicker = (timePickerRef) => {
    this.timePickerRef = timePickerRef;
  }

  focus() {
    this.timePickerRef.focus();
  }

  getDefaultFormat() {
    const { format, use12Hours } = this.props;
    if (format) {
      return format;
    } else if (use12Hours) {
      return 'h:mm:ss a';
    }
    return 'HH:mm:ss';
  }

  render() {
    const props = {
      ...this.props,
    };
    delete props.defaultValue;

    const format = this.getDefaultFormat();
    const className = classNames(props.className, {
      [`${props.prefixCls}-${props.size}`]: !!props.size,
    });

    const addon = (panel) => (
      props.addon ? (
        <div className={`${props.prefixCls}-panel-addon`}>
          {props.addon(panel)}
        </div>
      ) : null
    );

    return (
      <RcTimePicker
        {...generateShowHourMinuteSecond(format)}
        {...props}
        ref={this.saveTimePicker}
        format={format}
        className={className}
        value={this.state.value}
        placeholder={props.placeholder === undefined ? this.getLocale().placeholder : props.placeholder}
        onChange={this.handleChange}
        onOpen={this.handleOpenClose}
        onClose={this.handleOpenClose}
        addon={addon}
      />
    );
  }
}

const injectTimePickerLocale = injectLocale('TimePicker', defaultLocale);
export default injectTimePickerLocale(TimePicker);
