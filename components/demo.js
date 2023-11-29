import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React, {useState} from 'react'


const demo = () => {
    const [show, setShow] = useState(false)

    const handleEditClick = () => {
        setShow(true);
      };

  return (
    <View style={styles.container}>
      <Text>demo</Text>
      <View style={{flexDirection: 'row', justifyContent}}>
        <TouchableOpacity>
            <Text>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text>Edit</Text>
        </TouchableOpacity>        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default demo