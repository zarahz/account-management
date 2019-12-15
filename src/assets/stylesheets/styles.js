const styles = theme => ({
  snackError: {
    backgroundColor: '#d32f2f'
  },
  snackWarning: {
    backgroundColor: '#ffa000'
  },
  snackInfo: {
    backgroundColor: '#3f51b5'
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.6)',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100
  }
});

export default styles;
