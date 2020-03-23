import React, { Component } from 'react';
import { View, Text, Button, Picker, Modal, Platform, DatePickerIOS, DatePickerAndroid } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import moment from 'moment';

export default class DatePicker extends React.Component {
    static defaultProps = {
      disabled: false
    };
    constructor(props) {
      super(props);
      this.state = {
        modalVisible: false,
        defaultDate: props.defaultDate ? props.defaultDate : new Date(),
        chosenDate:
          !props.placeHolderText && props.defaultDate
            ? props.defaultDate
            : undefined
      };
    }
  
    setDate(date) {
      this.setState({ chosenDate: new Date(date) });
      if (this.props.onDateChange) {
        this.props.onDateChange(date);
      }
    }
  
    showDatePicker = () => {
      if (Platform.OS === 'android') {
        this.openAndroidDatePicker();
      } else {
        this.setState({ modalVisible: true });
      }
    };
  
    async openAndroidDatePicker() {
      try {
        const newDate = await DatePickerAndroid.open({
          date: this.state.chosenDate
            ? this.state.chosenDate
            : this.state.defaultDate,
          minDate: this.props.minimumDate,
          maxDate: this.props.maximumDate,
          mode: this.props.androidMode
        });
        const { action, year, month, day } = newDate;
        if (action === 'dateSetAction') {
          const selectedDate = new Date(year, month, day);
          this.setState({ chosenDate: selectedDate });
          this.props.onDateChange(selectedDate);
        }
      } catch ({ code, message }) {
        console.warn('Cannot open date picker', message);
      }
    }
  
    formatChosenDate(date) {
      if (this.props.formatChosenDate) {
        return this.props.formatChosenDate(date);
      }
      return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/');
    }
  
    render() {
      const {
        animationType,
        disabled,
        locale,
        maximumDate,
        minimumDate,
        modalTransparent,
        placeHolderText,
        placeHolderTextStyle,
        textStyle,
        timeZoneOffsetInMinutes
      } = this.props;
  
    //   const variables = this.context.theme
    //     ? this.context.theme['@@shoutem.theme/themeStyle'].variables
    //     : variable;
  
      return (
        <TouchableWithoutFeedback  onPress={() => (!disabled ? this.showDatePicker() : undefined)}>
            <View>
                <View>
                    <Text
                    //   onPress={() => (!disabled ? this.showDatePicker() : undefined)}
                    >
                    {this.state.chosenDate
                        ? this.formatChosenDate(this.state.chosenDate)
                        : placeHolderText || 'Select Date'}
                    </Text>
                    <View>
                    <Modal
                        supportedOrientations={['portrait', 'landscape']}
                        animationType={animationType}
                        transparent={modalTransparent} // from api
                        visible={this.state.modalVisible}
                        onRequestClose={() => {}}
                    >
                        <Text
                        onPress={() => this.setState({ modalVisible: false })}
                        style={{
                            backgroundColor: 'transparent',
                            flex: 1
                        }}
                        />
                        <DatePickerIOS
                        date={
                            this.state.chosenDate
                            ? this.state.chosenDate
                            : this.state.defaultDate
                        }
                        onDateChange={date => this.setDate(date)}
                        minimumDate={minimumDate}
                        maximumDate={maximumDate}
                        mode="date"
                        locale={locale}
                        timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
                        />
                    </Modal>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
      );
    }
  }
  

// export default class DatePicker extends Component {
//     state = {
//         date: moment(),
//         months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Descember'],
//         selectedMonth: '',
//         selectedDate: '',
//         selectedYear: '',
//         showPicker: false
//     };

//     constructor(props) {
//         super(props);
//         const today = moment();
//         this.state.selectedMonth = today.format('MMMM');
//         this.state.selectedDate = today.date();
//         this.state.selectedYear = today.year();
//     }

//     renderMonthPickerItems() {
//         return this.state.months.map(month => <Picker.Item key={month} value={month} label={month} />);
//     }

//     renderDatePickerItems() {
//         const { selectedMonth, selectedYear } = this.state;
//         const dates = this.getDates(selectedMonth, selectedYear);
//         return dates.map(date => <Picker.Item key={date} value={date} label={date} />);
//     }

//     renderYearPickerItems() {
//         const years = this.getYears();
//         years.map(year => <Picker.Item key={year} value={year} label={year} />);
//     }

//     getDates(month, year) {
//         let date = moment();
//         date.month(month);
//         date.yeaer(year);
//         const lastDateOfTheMonth = date.endOf('month').date();
//         const days = [];
//         for (let i = 1, max = lastDateOfTheMonth; i <= max; i++) {
//             days.push(i);
//         }
//         return days;
//     }

//     getYears() {
//         const today = moment();
//         const years = [];
//         for (let i = today.year(), min = 1945; i < max; i--) {
//             years.push(i);
//         }
//         return years;
//     }

//     handleDateChange = () => {
//         const date = moment();
//         const { selectedMonth, selectedDate, selectedYear } = this.state;
//         date.month(selectedMonth);
//         date.year(selectedYear);
//         if (date.endOf(month).date() >= selectedDate) {
//             date.date(selectedDate);
//         } else {
//             date.endOf(month);
//         }
//         date.startOf('day');
//         this.setState({
//             selectedMonth: date.format('MMMM'),
//             selectedDate: date.date(),
//             selectedYear: date.year()
//         });
//     }

//     render() {
//         const { selectedMonth, selectedDate, selectedYear, showPicker } = this.state;
//         return (
//             <Component>

//                 <View style={{ backgroundColor: 'white', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
//                     <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, borderBottomColor: '#D3D3D3', borderTopColor: '#D3D3D3', alignItems: 'flex-end' }}>
//                         <Button title="Done" onPress={this.props.onDoneBtnPressed} />
//                     </View>
//                     <View style={{ flexDirection: 'row' }}>
//                         <Picker
//                             style={{ flex: 1 }}
//                             selectedValue={selectedMonth}
//                             onValueChange={this.handleDateChange}
//                         >
//                             {this.renderMonthPickerItems()}
//                         </Picker>
//                         <Picker
//                             style={{ flex: 1 }}
//                             selectedValue={selectedDate}
//                             onValueChange={this.handleDateChange}
//                         >
//                             {this.renderDatePickerItems()}
//                         </Picker>
//                         <Picker
//                             style={{ flex: 1}}
//                             selectedValue={selectedYear}
//                             onValueChange={this.handleDateChange}
//                         >
//                             {this.renderYearPickerItems()}
//                         </Picker>
//                     </View>
//                 </View>
//             </Component>
//         );
//     }

// }