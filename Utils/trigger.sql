-- HISTORY TRIGGER, CUANDO CAMBIAN LOS PRECIOS--
--Crear para update e insert historial --
--usar old para update y new para insert
CREATE TRIGGER HISTORY_CREATE_PRICE
AFTER INSERT ON lista_producto FOR EACH ROW 
INSERT INTO historial (desde, hasta, monto, liquidacion, fk_lista, fk_producto, fecha) 
VALUES ( NEW.desde, NEW.hasta, NEW.monto, NEW.liquidacion, NEW.fk_lp_listaprecio, NEW.fk_lp_producto, curdate())


CREATE TRIGGER history_prices_update
AFTER UPDATE ON lista_producto FOR EACH ROW
INSERT INTO historial (desde, hasta, monto, liquidacion, fk_lista, fk_producto )
VALUES (OLD.desde, OLD.hasta, OLD.monto, NEW.liquidacion, NEW.fk_lp_listaprecio, NEW.fk_lp_producto, curdate())
