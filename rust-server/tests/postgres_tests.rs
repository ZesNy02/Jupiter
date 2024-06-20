#[cfg(test)]
mod test {
  use rust_server::{ models::database::DBConnectionInfo, utils::postgres::* };
  use sequential_test::sequential;
  use tokio::runtime::Runtime;

  fn dummy_postgres() -> DBConnectionInfo {
    return DBConnectionInfo::new(
      "localhost".to_string(),
      5432,
      "postgres".to_string(),
      "postgres".to_string(),
      "password".to_string()
    );
  }

  async fn drop_tables(info: &DBConnectionInfo) {
    let client = get_connection(info).await;
    if let Ok(client) = client {
      let _ = client.execute("DROP SEQUENCE IF EXISTS answers_answer_id_seq", &[]).await;
      let _ = client.execute("DROP TABLE IF EXISTS answers", &[]).await;
      //   let _ = client.execute("DROP TABLE IF EXISTS prompts", &[]);
    }
  }

  #[test]
  #[sequential]
  fn test_db_connection() {
    let info = dummy_postgres();
    let rt = Runtime::new().unwrap();

    let conn = rt.block_on(get_connection(&info));
    if let Err(e) = &conn {
      println!("Error: {}", e.log_message());
    }
    assert_eq!(conn.is_ok(), true);
  }

  #[test]
  #[sequential]
  fn test_insert_answer() {
    let info = dummy_postgres();
    let rt = Runtime::new().unwrap();

    let res = rt.block_on(insert_answer(&info, 1, &"test".to_string()));
    if let Err(e) = &res {
      println!("Error: {}", e.log_message());
    }
    assert_eq!(res.is_ok(), true);
    rt.block_on(drop_tables(&info));
  }

  #[test]
  #[sequential]
  fn test_update_rating() {
    let info = dummy_postgres();
    let rt = Runtime::new().unwrap();

    let _ = rt.block_on(insert_answer(&info, 1, &"test1".to_string()));
    let _ = rt.block_on(insert_answer(&info, 1, &"test2".to_string()));
    let res = rt.block_on(update_rating(&info, 1, 1));
    if let Err(e) = &res {
      println!("Error: {}", e.log_message());
    }
    assert_eq!(res.is_ok(), true);
    rt.block_on(drop_tables(&info));
  }

  #[test]
  #[sequential]
  fn test_find_answer() {
    let info = dummy_postgres();
    let rt = Runtime::new().unwrap();

    let _ = rt.block_on(insert_answer(&info, 1, &"test1".to_string()));
    let _ = rt.block_on(insert_answer(&info, 1, &"test2".to_string()));
    let _ = rt.block_on(insert_answer(&info, 2, &"test3".to_string()));
    let _ = rt.block_on(insert_answer(&info, 2, &"test4".to_string()));
    let res = rt.block_on(find_answer(&info, 1));
    if let Err(e) = &res {
      println!("Error: {}", e.log_message());
      assert!(true);
    } else {
      assert!(false);
    }
    let _ = rt.block_on(update_rating(&info, 1, 1));
    let res = rt.block_on(find_answer(&info, 1));
    if let Err(e) = &res {
      println!("Error: {}", e.log_message());
    }
    assert_eq!(res.is_ok(), true);
    rt.block_on(drop_tables(&info));
  }
}
