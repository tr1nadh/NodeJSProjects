
export async function show(bodyContent) {
    let alertToast = document.getElementById("alertToast");
    $("#alertToastBody").html(bodyContent);
    const toast = bootstrap.Toast.getOrCreateInstance(alertToast);
    toast.show();
}

export async function showSuccess(bodyContent) {
    let alertToast = document.getElementById("alertToast");
    $("#alertToast").removeClass();
    $("#alertToast").addClass("toast border border-success-subtle");
    $("#alertToastBody").html(bodyContent);
    const toast = bootstrap.Toast.getOrCreateInstance(alertToast);
    toast.show();
}

export async function showError(bodyContent) {
    let alertToast = document.getElementById("alertToast");
    $("#alertToast").removeClass();
    $("#alertToast").addClass("toast border border-danger-subtle");
    $("#alertToastBody").html(bodyContent);
    const toast = bootstrap.Toast.getOrCreateInstance(alertToast);
    toast.show();
}

