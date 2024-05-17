<!DOCTYPE html>
<html>

<head>
    <title>Cuadrado Mágico</title>
    <link rel="stylesheet" type="text/css" href="index.css">
</head>

<body>
    <div class="alert">
        <p>Celda Fila:<span id="infoRow"></span> Columna:<span id="infoColumn"></span></p>
        <div id="colorsInfo">
            <div id="newColorsInfo">
                <p>Color Anterior:</p>
                <div class="colorAlert" id="oldColorAlert">
                    <span class="alertHexaColor" id="alertHexaColorOld"></span>
                </div>

            </div>
            <div id="oldColorsInfo">
                <p>Color Nuevo:</p>
                <div class="colorAlert" id="newColorAlert">
                    <span class="alertHexaColor" id="alertHexaColorNew"></span>
                </div>
            </div>
        </div>
        <button id="acceptButton" style="float: right;">Aceptar</button>
    </div>
    <h1 class="title">
        Matrix de Colores
    </h1>
    <?php
    function generateRandomColor()
    {
        $rojo = rand(0, 255);
        $verde = rand(0, 255);
        $azul = rand(0, 255);

        $colorAleatorio = sprintf("#%02x%02x%02x", $rojo, $verde, $azul);

        return $colorAleatorio;
    }
    $usedColors = [];

    echo "<table border='1'>";
    for ($i = 0; $i <= 14; $i++) {
        echo "<tr>";
        for ($j = 0; $j <= 14; $j++) {
            if ($i == 0 && $j == 0) { // Si estamos en la primera fila y en la primera columna, dejamos la celda vacía o con 0
                echo "<th>0</th>";
            } else if ($i == 0) { // Si estamos en la primera fila, generamos los títulos de las columnas
                echo "<th>" . $j . "</th>";
            } else if ($j == 0) { // Si estamos en la primera columna, generamos los títulos de las filas
                echo "<th>" . $i . "</th>";
            } else {
                do {
                    $color = generateRandomColor();
                } while (in_array($color, $usedColors));
                $usedColors[] = $color;
                echo "<td class='Cell' style='background-color: $color' onclick='showColor(this,$i,$j)'>
                <p class='cellData'>Celda:</p> 
                <p class='cellData'>$i,$j</p> 
                <p class='cellData'>Color:</p> 
                <p class='hexaColor cellData'></p>
                </td>";
            }
        }
        echo "</tr>";
    }
    echo "</table>";

    ?>
    <script>
        let usedColors = <?php echo json_encode($usedColors); ?>;
    </script>
    <script src="main.js"></script>
</body>

</html>