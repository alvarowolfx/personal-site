---
title: "IoT Tank Monitoring Solution Part 3 — Visualizing data using CloudSQL Federated Queries, BigQuery…"
author: "Alvaro Viebrantz"
date: 2020-01-06T16:01:01.345Z
lastmod: 2021-02-26T10:52:01-04:00

description: ""

subtitle: "End to end solution to track tank level using cloud computing without having to worry too much with managing infrastructure."

image: "/articles/2020/2020-01-06_iot-tank-monitoring-solution-part-3visualizing-data-using-cloudsql-federated-queries-bigquery/images/7.png"
images:
  - "/articles/2020/2020-01-06_iot-tank-monitoring-solution-part-3visualizing-data-using-cloudsql-federated-queries-bigquery/images/1.png"
  - "/articles/2020/2020-01-06_iot-tank-monitoring-solution-part-3visualizing-data-using-cloudsql-federated-queries-bigquery/images/2.jpeg"
  - "/articles/2020/2020-01-06_iot-tank-monitoring-solution-part-3visualizing-data-using-cloudsql-federated-queries-bigquery/images/3.jpeg"
  - "/articles/2020/2020-01-06_iot-tank-monitoring-solution-part-3visualizing-data-using-cloudsql-federated-queries-bigquery/images/4.png"
  - "/articles/2020/2020-01-06_iot-tank-monitoring-solution-part-3visualizing-data-using-cloudsql-federated-queries-bigquery/images/5.png"
  - "/articles/2020/2020-01-06_iot-tank-monitoring-solution-part-3visualizing-data-using-cloudsql-federated-queries-bigquery/images/6.png"
  - "/articles/2020/2020-01-06_iot-tank-monitoring-solution-part-3visualizing-data-using-cloudsql-federated-queries-bigquery/images/7.png"

aliases:
  - "/iot-tank-monitoring-solution-part-3-visualizing-data-using-cloudsql-federated-queries-bigquery-1a92d1a565a3"
---

#### End to end solution to track tank level using cloud computing without having to worry too much with managing infrastructure.

This is a 3 part tutorial on how to create a farm tank monitoring solution on Google Cloud.

- Part 1 — [Build a Rest API using Cloud Run and Django Rest Framework](https://medium.com/@alvaroviebrantz/iot-tank-monitoring-solution-part-1-build-a-rest-api-using-cloud-run-and-django-rest-framework-a8b9770eaa87)
- Part 2 — [MicroPython device to collect tanks data](https://medium.com/@alvaroviebrantz/iot-tank-monitoring-solution-part-2-micropython-device-with-esp8266-to-collect-tank-level-data-d74a1b947f60)
- Part 3 — Visualizing data using BigQuery Federated Queries and Data Studio

In this latest part we are going to visualize our models data together with the telemetry data sent by the device. We are going to be using a feature on BigQuery called Federated Queries, which basically allows us to query external data inside of BigQuery, mixing different data sources and building our Data Lake more easily.

![image](/articles/2020/2020-01-06_iot-tank-monitoring-solution-part-3visualizing-data-using-cloudsql-federated-queries-bigquery/images/1.png)

> BigQuery Federated Queries is in beta right now and accepts connecting to Cloud SQL, CSV files in Google Cloud Storage and Google Cloud Big Table.

#### Set up Federated access to our Cloud SQL Database

All the steps here are going to be made on the Google Cloud UI as seems to be easier to do that way. First we go to BigQuery UI and add an external sources:

![image](/articles/2020/2020-01-06_iot-tank-monitoring-solution-part-3visualizing-data-using-cloudsql-federated-queries-bigquery/images/2.jpeg)

Them we choose Cloud SQL datasource and add our database instance information, we used that same configuration ( instance connection, username, password and database name ) to deploy our Django Rest backend on Cloud Run. One additional configuration here is the connection name, to be used on BigQuery to query our external data. I called mine `tank-monitoring`.

![image](/articles/2020/2020-01-06_iot-tank-monitoring-solution-part-3visualizing-data-using-cloudsql-federated-queries-bigquery/images/3.jpeg)

And that’s basically it, now we can query Cloud SQL data from BigQuery using the `EXTERNAL_QUERY` command. Here is an example of getting the farm list from our Cloud SQL database using BigQuery ( you can test that in the [BigQuery UI](https://console.cloud.google.com/bigquery):

```
select farms.*
from EXTERNAL_QUERY(“[YOUR_PROJECT_NAME].us.tank-monitoring.farms”) farms
```

Now let’s build our dashboard using both data sources.

#### Building dashboard on Data Studio

We want to visualize telemetry data and be able to filter by Farm and by Tank. So we are going to create a query returning all the data for the report with a date range filter to avoid returning too much telemetry data. I wrote a query to do that and also calculate the level of each tank accordingly to the configured height. The `DS_START_DATE` and `DS_END_DATE` are the parameter that are going to be filled by Data Studio. You can comment the date filter and run this query on BigQuery to see some data.

```
SELECT
device.deviceId,
tank.id as tankId,
tank.name as tankName,
tank.height,
farm.id as farmId,
farm.name as farmName,
JSON*EXTRACT(telemetry.data, ‘$.distance’) as distance,
  if(tank.height < 0, 100*(tank.height — CAST(JSON_EXTRACT(telemetry.data, ‘$.distance’) as float64))/tank.height, 0) as level,
telemetry.time
FROM EXTERNAL_QUERY(“[YOUR_PROJECT_NAME].us.tank-monitoring”,“SELECT * FROM tank*monitoring_farm;”) farm
left outer join EXTERNAL_QUERY(“[YOUR_PROJECT_NAME].us.tank-monitoring”, “SELECT * FROM tank_monitoring_tank;”) tank
on tank.farm_id = farm.id
left outer join EXTERNAL_QUERY(“[YOUR_PROJECT_NAME].us.tank-monitoring”, “SELECT \* FROM tank_monitoring_device;”) device
on device.tank_id = tank.id
left outer join `[YOUR_PROJECT_NAME].tank_monitoring_dataset.device_telemetry` telemetry
on CAST(device.id as string) = telemetry.device_id
where telemetry.time between PARSE_TIMESTAMP(‘%Y%m%d’,@DS_START_DATE)
and PARSE_TIMESTAMP(‘%Y%m%d’,@DS_END_DATE)
order by telemetry.time

```

![image](/articles/2020/2020-01-06_iot-tank-monitoring-solution-part-3visualizing-data-using-cloudsql-federated-queries-bigquery/images/4.png)

Go to Data Studio to get started creating the dashboard and click on create Blank Report.

[Data Studio Product Overview](https://datastudio.google.com)

Them, create a new Data Source, search for BigQuery connector and select it.

![image](/articles/2020/2020-01-06_iot-tank-monitoring-solution-part-3visualizing-data-using-cloudsql-federated-queries-bigquery/images/5.png)

On the next screen, choose Custom Query &gt; [YOUR_PROJECT_NAME] &gt; Enter Custom Query. Here copy our SQL query joining Cloud SQL DB and BigQuery. Enable date parameters to fill the `DS_START_DATE` and `DS_END_DATE` parameters. Them click connect.

![image](/articles/2020/2020-01-06_iot-tank-monitoring-solution-part-3visualizing-data-using-cloudsql-federated-queries-bigquery/images/6.png)

The rest is mostly dragging and dropping some components to build your dashboard. I’ll not go thought each step, but after getting you data on Data Studio, it should be pretty straightforward to build the same thing.

![image](/articles/2020/2020-01-06_iot-tank-monitoring-solution-part-3visualizing-data-using-cloudsql-federated-queries-bigquery/images/7.png)

#### Conclusion

This last part is also a bit short, but is just to show how simple we merge data from Cloud SQL and BigQuery and show that on a dashboard that users can have access and see data flowing on the system. I hope with this tutorial you have a better sense on how to build an end to end solution using Google Cloud.
