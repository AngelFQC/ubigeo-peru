'use strict';

import 'bootstrap';
import ubigeoPeru from 'ubigeo-peru';
import _ from 'lodash';

$(function () {
    const rdbType = $('[name="rdb-type"]'),
        slcDepartamentos = $('#slc-departamentos'),
        slcProvincias = $('#slc-provincias'),
        slcDistritos = $('#slc-distritos'),
        txtUbigeo = $('#ubigeo-code');

    let currentUbigeo = [];

    let ubigeoSelected = {
        departamento: '',
        provincia: '',
        distrito: ''
    };

    rdbType.on('change', function () {
        if ('reniec' === this.value) {
            currentUbigeo = ubigeoPeru.reniec;
        } else {
            currentUbigeo = ubigeoPeru.inei;
        }

        slcDepartamentos.html('');
        slcProvincias.html('');
        slcDistritos.html('');

        _
            .filter(currentUbigeo, item => {
                return '00' === item.provincia &&
                    '00' === item.distrito;
            })
            .forEach(item => {
                slcDepartamentos.append(`<option value="${item.departamento}">${item.nombre}</option>`);
            });

        slcDepartamentos.trigger('change');
    });

    slcDepartamentos.on('change', function () {
        ubigeoSelected.departamento = this.value;

        slcProvincias.html('');

        _
            .filter(currentUbigeo, item => {
                return ubigeoSelected.departamento === item.departamento &&
                    '00' !== item.provincia &&
                    '00' === item.distrito;
            })
            .forEach(item => {
                slcProvincias.append(`<option value="${item.provincia}">${item.nombre}</option>`);
            });

        slcProvincias.trigger('change');
    });

    slcProvincias.on('change', function () {
        ubigeoSelected.provincia = this.value;

        slcDistritos.html('');

        _
            .filter(currentUbigeo, item => {
                return ubigeoSelected.departamento === item.departamento &&
                    ubigeoSelected.provincia === item.provincia &&
                    '00' !== item.distrito;
            })
            .forEach(item => {
                slcDistritos.append(`<option value="${item.distrito}">${item.nombre}</option>`);
            });

        slcDistritos.trigger('change');
    });

    slcDistritos.on('change', function () {
        ubigeoSelected.distrito = this.value;

        const {departamento, provincia, distrito} = ubigeoSelected;

        txtUbigeo.text(`${departamento}${provincia}${distrito}`);
    });
});
