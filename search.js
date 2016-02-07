var ubigeoPeru = {
	ubigeos: new Array()
};

document.addEventListener('DOMContentLoaded', function() {
	var request = new XMLHttpRequest;
	request.open('GET', './ubigeo-peru.min.json', true);
	request.onload = onLoad_Request;
	request.send();

	function onLoad_Request() {
		if (request.status >= 200 && request.status < 400) {
			ubigeoPeru.ubigeos = JSON.parse(request.responseText);

			showRegionsList();
		}
	}
});

function showRegionsList() {
	ubigeoPeru.ubigeos.forEach(function(ubigeo) {
		if (ubigeo.provincia === '00' && ubigeo.distrito === '00') {
			var li = document.createElement('li');

			var input = document.createElement('input');
			input.id = 'dpto-' + ubigeo.departamento;
			input.name = 'departamento';
			input.type = 'radio';
			input.value = ubigeo.departamento;
			input.addEventListener('change', onChange_Region, false);

			var label = document.createElement('label');
			label.htmlFor = 'dpto-' + ubigeo.departamento;
			label.textContent = ubigeo.departamento + ' ' + ubigeo.provincia + ' ' + ubigeo.distrito + ' - ' + ubigeo.nombre;

			li.appendChild(input);
			li.appendChild(label);

			document.querySelector('#regions-list').appendChild(li);
		}
	});
}

function onChange_Region() {
	document.querySelector('#provinces-list').innerHTML = '';
	document.querySelector('#districts-list').innerHTML = '';

	showProvincesList(this.value);
}

function showProvincesList(departamento) {
	ubigeoPeru.ubigeos.forEach(function(ubigeo) {

		if (ubigeo.departamento === departamento && ubigeo.provincia !== 0 && ubigeo.distrito === '00') {
			var li = document.createElement('li');

			var input = document.createElement('input');
			input.id = 'prov-' + ubigeo.provincia;
			input.name = 'provincia';
			input.type = 'radio';
			input.value = ubigeo.provincia;
			input.addEventListener('change', onChange_Province, false);

			var label = document.createElement('label');
			label.htmlFor = 'prov-' + ubigeo.provincia;
			label.textContent = ubigeo.departamento + ' ' + ubigeo.provincia + ' ' + ubigeo.distrito + ' - ' + ubigeo.nombre;

			li.appendChild(input);
			li.appendChild(label);

			document.querySelector('#provinces-list').appendChild(li);
		}
	});
}

function onChange_Province() {
	document.querySelector('#districts-list').innerHTML = '';

	var departamento = document.querySelector('[name=departamento]:checked').value;

	showDistrictsList(departamento, this.value);
}

function showDistrictsList(departamento, provincia) {
	ubigeoPeru.ubigeos.forEach(function(ubigeo) {

		if (ubigeo.departamento === departamento && ubigeo.provincia === provincia && ubigeo.distrito !== 0) {
			var li = document.createElement('li');

			var input = document.createElement('input');
			input.id = 'dist-' + ubigeo.distrito;
			input.name = 'distrito';
			input.type = 'radio';
			input.value = ubigeo.distrito;

			var label = document.createElement('label');
			label.htmlFor = 'dist-' + ubigeo.distrito;
			label.textContent = ubigeo.departamento + ' ' + ubigeo.provincia + ' ' + ubigeo.distrito + ' - ' + ubigeo.nombre;

			li.appendChild(input);
			li.appendChild(label);

			document.querySelector('#districts-list').appendChild(li);
		}
	});
}

