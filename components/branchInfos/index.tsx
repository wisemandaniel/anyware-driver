import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface BranchInfoProps {
  branchName: string;
  branchIconUri: string;
}

const BranchInfo: React.FC<BranchInfoProps> = ({ branchName, branchIconUri }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: branchIconUri }} style={styles.branchIcon} />
      <Text style={styles.label}>Branch</Text>
      <Text style={styles.branchName}>{branchName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  branchIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginRight: 5,
  },
  branchName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BranchInfo;
