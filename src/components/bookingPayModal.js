import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function BookingPayModal({
  open,
  closePayModal,
  booking,
  pay,
  bookingLoading,
}) {
  const handleClose = () => {
    closePayModal();
  };

  return (
    <div className="pay-modal">
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Confirm Payment
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Type : {booking.service_type}</Typography>
          <Typography gutterBottom>
            Description : {booking.description}
          </Typography>
          <Typography gutterBottom>Price : {booking.price}</Typography>
          <Typography gutterBottom>
            Amount Payable :
            {parseInt(booking.price) -
              Math.round(parseInt(booking.price) * parseInt(booking.discount)) /
                100}
          </Typography>
        </DialogContent>
        <DialogActions>
          {!bookingLoading ? (
            <Button autoFocus onClick={pay} color="primary">
              Pay
            </Button>
          ) : (
            <Button color="primary">Booking...</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
