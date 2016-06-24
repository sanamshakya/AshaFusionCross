import React from 'react'
import {
  View,
  StyleSheet,
  Navigator,
  ScrollView,
} from 'react-native'
import Button from 'react-native-button'

import Root from '../../common/Root.react'

import Title from './Title.react'
import PatientList from '../containers/PatientList.react'
import PatientView from '../containers/PatientView.react'
import Settings from '../containers/Settings.react'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e9eaed',
    flex: 1,
  },
  spacer: {
    height: 270,
  },
  wrapper: {
    flex: 1,
    paddingTop: 10,
  },
});

export default React.createClass({
  render() {
    return (
      <Root>
        <Navigator
          initialRoute={{name: 'patient-list'}}
          renderScene={(route, navigator) => {
            switch (route.name) {
              case 'patient-list':
                return (
                  <View style={styles.container}>
                    <Title title='ASHA fusion'/>
                    <Button
                      onPress={() => {
                        navigator.push({
                          name: 'settings',
                        })
                      }}
                    >Settings</Button>
                    <ScrollView style={styles.wrapper}>
                      <PatientList
                        onPatientSelect={(patientId) => {
                          navigator.push({
                            name: 'patient-view',
                            patientId: patientId,
                          })
                        }}
                      />
                    </ScrollView>
                    <Button
                      onPress={() => {
                        navigator.push({
                          name: 'patient-view',
                          patientId: null,
                        })
                      }}
                    >New</Button>
                  </View>
                )
              case 'patient-view':
                return (
                  <View style={styles.container}>
                    <Title
                      title='ASHA fusion'
                      onBack={() => navigator.pop()}
                    />
                    <ScrollView style={styles.wrapper}>
                      <PatientView
                        patientId={ route.patientId }
                      />
                    </ScrollView>
                  </View>
                )

              case 'settings':
                return (
                  <View style={styles.container}>
                    <Title
                      title='ASHA fusion'
                      onBack={() => navigator.pop()}
                    />
                    <Settings />
                  </View>
                )

              default:
                return null
            }
          }
          }
        />
      </Root>
    )
  }
})
