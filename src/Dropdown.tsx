import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  ViewStyle,
  StyleProp,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent'
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: 'white',
    shadowRadius: 3,
    shadowOpacity: 0.3,
    elevation: 4
  },
  list: {
    // flexGrow: 1,
  },
  rowText: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 12,
    backgroundColor: 'white',
    alignSelf: 'flex-start'
  }
})

interface ButtonFrame {
  x: number
  y: number
  w: number
  h: number
}

interface FlatListData {
  title: string
  key: string | number
}

interface DropdownProps {
  rowData: string[]
  onRowClick?(idx: number): void
}

interface DropdownStates {
  showDropdown: boolean
  listData: FlatListData[]
}

export default class HamburgerButton extends React.Component<DropdownProps, DropdownStates> {
  buttonRef: React.RefObject<TouchableOpacity> = React.createRef()
  buttonFrame: ButtonFrame

  constructor(props) {
    super(props)

    // dataSource for list
    const { rowData } = this.props
    const data = rowData.map(i => ({
      title: i,
      key: i
    }))
    this.state = {
      showDropdown: false,
      listData: data
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onButtonPress} ref={this.buttonRef}>
          <View
            style={{
              padding: 12
            }}
          >
            <Icon name="more-vert" size={24} color="#757575" />
          </View>
        </TouchableOpacity>
        {this.renderModal()}
      </View>
    )
  }

  updatePosition = callback => {
    this.buttonRef.current.measure((_x, _y, width, height, pageX, pageY) => {
      console.log('_x, _y, width, height, pageX, pageY', _x, _y, width, height, pageX, pageY)
      this.buttonFrame = {
        x: pageX,
        y: pageY,
        w: width,
        h: height
      }
      callback && callback()
    })
  }

  show = () => {
    this.updatePosition(() => {
      this.setState({ showDropdown: true })
    })
  }

  hide = () => {
    this.updatePosition(() => {
      this.setState({ showDropdown: false })
    })
  }

  select = (idx: number) => {
    /* PH for onRowSelect event */
  }

  onButtonPress = () => {
    this.show()
  }

  onModalRequestClose = () => {
    this.hide()
  }

  onModalPress = () => {
    this.hide()
  }

  calcPosition = (): StyleProp<ViewStyle> => {
    const dimensions = Dimensions.get('window')
    const windowWidth = dimensions.width

    const positionStyle: StyleProp<ViewStyle> = {
      top: Math.max(8, this.buttonFrame.y),
      right: Math.max(8, windowWidth - this.buttonFrame.x - this.buttonFrame.w)
    }

    console.log(`top: ${positionStyle.top}, right: ${positionStyle.right}`)
    return positionStyle
  }

  renderRow = ({ item }) => <Text style={styles.rowText}>{item.title}</Text>

  renderDropdown = () => <FlatList style={styles.list} data={this.state.listData} renderItem={this.renderRow} />

  renderModal = () => {
    if (!this.state.showDropdown) {
      return null
    }

    const frameStyle = this.calcPosition()

    return (
      <Modal
        animationType="fade"
        visible
        transparent
        onRequestClose={this.onModalRequestClose}
        supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
      >
        <TouchableWithoutFeedback onPress={this.onModalPress}>
          <View style={styles.modal}>
            <View style={[styles.dropdown, frameStyle]}>
            {this.renderDropdown()}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}
