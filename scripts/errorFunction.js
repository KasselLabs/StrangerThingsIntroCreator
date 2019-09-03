import swal from 'sweetalert2';
// import * as Sentry from '@sentry/browser';

export default function ajaxErrorFunction(bodyMessage){
  return function (error){
    console.log(error.status, error.statusText);
    // Sentry.addBreadcrumb({
    //   message: 'Error modal with body message: '+ bodyMessage,
    //   level: 'info',
    // });
    // Sentry.captureException(new Error(bodyMessage));

    // swal({
    //   title: '<h2 style="font-family: BenguiatITCW01-BoldCn;">An Error has occured</h2>',
    //   html: '<p style="text-align: left">Something went wrong! Sorry about that! Please try again reloading the page, if this error repeats please report to us on the button below.'+
    //         '</p>',
    //   type: "error",
    //   confirmButtonText: "Reload Page",
    //   cancelButtonText: "Report details",
    //   showCancelButton: true,
    //   allowOutsideClick: false,
    // }).then(() => {
    //   window.location.reload();
    // },() => {
    //   Sentry.lastEventId();
    //   Sentry.showReportDialog();
    // });

    swal({
      title: '<h2 style="font-family: BenguiatITCW01-BoldCn;">An Error has occured</h2>',
      html: '<p style="text-align: left">Something went wrong! Sorry about that! Please try again reloading the page, if this error repeats please report to us on the button below.'+
            '<br><a style="color: #C11B1F;" href="mailto:StrangerThings@kassellabs.io?Subject=STIC%20Problem&Body='+bodyMessage+'" target="_blank">StrangerThings@kassellabs.io</a></p>',
      type: "error",
      confirmButtonText: "Reload Page",
      cancelButtonText: "Report details",
      allowOutsideClick: false,
    }).then(() => {
      window.location.reload();
    },() => {
    });


  };
}